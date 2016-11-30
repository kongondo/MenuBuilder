/** 
*
* Javascript file for PW Module ProcessMenuBuilder
*
* @author Francis Otieno (Kongondo) <kongondo@gmail.com>
*
* https://github.com/kongondo/ProcessMenuBuilder
* Created March 2015
*
*/

$(document).ready(function(){

	var $form = $("#MenuBuilderEdit"); 
	
	/* 01. #### WIRE TABS #### */

	//remove scripts, because they've already been executed since we are manipulating the DOM below (WireTabs)
	//which would cause any scripts to get executed twice
	$form.find("script").remove();

	$form.WireTabs({
		items: $(".WireTab"),
		skipRememberTabIDs: ['ProcessMenuBuilderDelete'],
		rememberTabs: true
	});
	
	/* 02. #### MB CUSTOM AsmSelect OUTPUT #### */

	$(".InputfieldAsmSelect select[multiple=multipleMB]").each(function() {
		var $t = $(this);

		if(typeof config === 'undefined') {
			var options = { sortable: true };
		}

		else {
			var options = config[$t.attr('id')]; 
		}

		$t.asmSelectMB(options);//asmSelectMB() is our modified AsmSelect's function (see jquery.asmselect-mb.js)

	});

	/* 03. #### MB CUSTOM Autocomplete OUTPUT #### */


	/* 04. #### MarkupAdminDataTable #### */

	/** Toggle all checkboxes in the list of menus tables **/
	/*$('input.toggle_all').click(function(){
		if ($(this).prop('checked')) {
			$('input.toggle').prop('checked', true);
		} else {
			$('input.toggle').prop('checked', false);
		}
	});*/

	/** Fix for MarkupAdminDataTable: Don't enable sorting on first column with input checkbox **/
	//if ($.tablesorter != undefined) $.tablesorter.defaults.headers = {0:{sorter:false}};

	//if we are NOT on the menu items table, for sortable tables, disable sorting on first column
	if (!$('table').hasClass('no_disable')) {
			if ($.tablesorter != undefined) $.tablesorter.defaults.headers = {0:{sorter:false}};//works but requires two clicks to kick-in!
	}

	/* on change in select to limit menus show in table */
	//note: broken in PW dev 2.5.7. See issue #784 on GitHub - removeClass() fix
	$('#limit').change(function(){ $(this).closest("form").removeClass("nosubmit").submit(); });//note workaround for PW issue #784 (GitHub)	


	/* 05. #### BUILD MENU TAB #### */

	/** insert li with header labels in the PageAutocomplete list items **/
	//@note: mod for MB
	var extraLabels ='<li id="menu_items_headers">';
	extraLabels +='<span id="ac_title">Title</span>';
	extraLabels +='<span id="ac_css_id">CSS ID</span>';
	extraLabels +='<span id="ac_css_class">CSS Class</span>';

	//conditionally add 'include children' markup
	var moduleConfigIncludeChildren = config.ProcessMenuBuilder2;

	if(!jQuery.isEmptyObject(moduleConfigIncludeChildren)) {
			var incChildren = moduleConfigIncludeChildren.config.children;
			if(incChildren == 1) {
				extraLabels +='<span id="ac_children">Children</span>';
				extraLabels +='<span id="ac_level">Level</span>';
			}			
	}

	extraLabels +='</li>';

	var headers = $(extraLabels);
	$('#item_addpages_items').prepend(headers);
	//$('#menu_items_headers').removeClass('ui-state-default');

	/** Add row - clone the last tr of the table to add custom menu items **/
	var clonePageRow = function() {
		$tr = $('table.menu_add_custom_items_table tr:last');
		$clone = $tr.clone(true);
		$clone.find('input[type=text]').attr('value','');

		$('table.menu_add_custom_items_table').append($clone);
		$clone.find('input:first').focus();
		return false;
	}
	
	$('.addrow').click(clonePageRow);

	/** Remove a tr **/
	 var removeTr = function() {
	 	var $tr = $(this).closest('tr');
		if ($tr.prev('tr').find('input').length) $tr.remove();
		return false;	 	 				 
	 };

	if ($.isFunction($(document).on)) {
	    $(document).on('click', '.remove_row', removeTr);
	} else {
	    $('.remove_row').live('click', removeTr);
	} 

	/** remove single menu item from drag n drop field **/
		var removeMenu = function() {
	 	var $rm = $(this).closest('li');
		$rm.remove();
		return false;	 	 				 
	 };

	if ($.isFunction($(document).on)) {
	    $(document).on('click', '.remove_menu', removeMenu);
	} else {
	    $('.remove_menu').live('click', removeMenu);
	}

	/** remove all menu items in drag n drop field **/
	$('#remove_menus').click(function(e) {
		$("ol.sortable").empty();
		e.preventDefault(); //prevent default click <a> action
	});

	/** toggle view/hide each menu's settings editor **/
		$('div.settings').hide();
		$('.item_expand_settings, .item_title_main').click(function(){
		var id = $(this).attr('data-id');
		//$('#menu_edit'+id).toggle();
		$('#menu_edit'+id).slideToggle(500);
		$('a').find('[data-id="'+ id + '"]').toggleClass('fa-caret-down').toggleClass('fa-caret-up');
		});

	/** Toggle view/hide add page menu items panel **/	 
	$("#wrap_item_addpages").hide();//hide li wrapper for add page menus items on load
	$('#add_page_menu_items').click(function(e) {
	//show/hide the asmSelect for adding page menu items
		$("#wrap_item_addpages").toggle(250);
		e.preventDefault(); //prevent default click <a> action from happening!
	});

	/** Toggle view/hide add custom menu items panel **/ 
	$("#item_addcustom").hide();//hide li wrapper for add custom menu items settings on load
	$('#add_custom_menu_items').click(function(e) {
		$("#item_addcustom").toggle(250);
		e.preventDefault();
	});

	/** Toggle view/hide add pages selector menu items panel **/ 
	$("#wrap_item_addselector").hide();//hide div for add custom menu items settings on load
	$('#add_selector_menu_items').click(function(e) {
		$("#wrap_item_addselector").toggle(250);
		e.preventDefault();
	});

	/* 06. #### DELETE MENU TAB #### */

	//trigger a submit_delete submission. this is necessary because when submit_delete is an <input type='submit'> then 
	//some browsers call it (rather than submit_save) when the enter key is pressed in a text field. This solution
	//by passes that undesirable behavior. 
	$("#menu_delete").click(function() {
		if(!$("#menu_delete_confirm").is(":checked")) {
			$("#wrap_menu_delete_confirm label").effect('highlight', {}, 500); 
			return;
		}
		$(this).before("<input type='hidden' name='menu_delete' value='1'>"); 
		$("#MenuBuilderEdit").submit();
	});


	/* 07. #### FORCE SEND CUSTOM ITEMS 'new_tab' VALUE #### */

	// we use a hidden input to send value based on 'checked' propert of new_tab checkbox

	// Toggle value of new tab + closest corresponding hidden input
	$('input.newtab').change(function(){
		if ($(this).prop('checked')) {			
			$(this).val(1);
			$(this).parent().find('input.newtabhidden').val(1);
		}
		else {
			$(this).val(0);
			$(this).parent().find('input.newtabhidden').val(0);
		}
	});


	/* 08. #### nestedSortable #### */

	//###############################################################################################################
		
	/** nestedSortable js configurations **/

	//nestedSortable custom configs for each menu (defined in ProcessMenuBuilder::nestedSortableConfigs())
	var moduleConfigNested = config.ProcessMenuBuilder1;

	if(!jQuery.isEmptyObject(moduleConfigNested)) {

			//**Configuration***
			$('ol.sortable').nestedSortable({
					rootID: 0,//name given to items at the root level; default is null
					disableNesting: 'mjs-nestedSortable-no-nesting',
					forcePlaceholderSize: true,
					handle: 'div',
					helper:	'clone',
					listType: 'ol',
					items: 'li',
					opacity: .6,
					placeholder: 'placeholder',
					revert: 250,
					tolerance: 'pointer',
					toleranceElement: '> div',

					
					//****** custom ******
					maxLevels: moduleConfigNested.config.maxLevels,
					//disableParentChange: moduleConfigNested.config.disableParentChange,//@@todo -not working; stops drag n drop
					expandOnHover: moduleConfigNested.config.expandOnHover,
					//protectRoot: moduleConfigNested.config.protectRoot,//@@todo - unsure: //@@todo -not working; stops drag n drop
					//rtl: moduleConfigNested.config.rtl,//@@todo -not working; stops drag n drop
					startCollapsed: moduleConfigNested.config.startCollapsed,
					tabSize: moduleConfigNested.config.tabSize,
					doNotClear: moduleConfigNested.config.doNotClear,
					/*isTree: moduleConfigNested.config.isTree,*///@@todo -not working; stops drag n drop
					//disableNesting: //@@todo - not sure whether to add this
			
			});


	}//end if moduleConfigNested not empty

	/** End nestedSortable configs

	/** Grab items' parents on update [drag/drop] **/

	$('div#menu_sortable_wrapper .sortable').sortable({
	
		//FUNCTION TO CAPTURE PARENT IDs OF MENU ITEMS ON DRAG & DROP EVENT AND SAVE THESE FOR EACH MENU ITEM [in their individual hidden fields]
		update: function(event,ui)   {
		//create an array of menu item_id's and their parent_id's. Update parent ids at the finish of the drag/drop event [function - toArray]
			var order = $( ".sortable" ).sortable('toArray');
			
			//loop through the values [this is a 2 dimensional object ]
			for(var key in order) {
				
				var id = order[key].item_id;//the item id; retrieved via the key 'item_id' which is the name given by toArray
	
				var parent = order[key].parent_id;// the parent id
				
				//update each menu item's hidden parent field value to store the new parent
				$("#item_parent"+id).val(parent);
				/*
				*	note:
				*	Here we look for the id that matches the item_id, e.g. #item_parent5. 
				*	This matching ensures correct assignment of parentage. 
				*	Note, item_parent id is not the ID of the PW page parent! 
				*	The ID of the parent is the value of this input field, item_parent[]. Need the item_parent{$id} here for convenience.
				*
				*/
				
			}
		
		}

	});

	/* end nestedSortable */
	//###############################################################################################################
		
});//end jQuery

/** Toggle all checkboxes in the list of menus tables **/
$(document).on('change', 'input.toggle_all', function() {
	if ($(this).prop('checked')) $('input.toggle').prop('checked', true);
	else $('input.toggle').prop('checked', false);
});