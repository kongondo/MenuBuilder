	/* javascript file for PW Module ProcessMenuBuilder - version 0.0.1
	 ***********************************************************************/

$(document).ready(function(){

	var $form = $("#MenuBuilderEdit"); 
	
	/*
	* Wire tabs
	*
	*/

	// remove scripts, because they've already been executed since we are manipulating the DOM below (WireTabs)
	// which would cause any scripts to get executed twice
	$form.find("script").remove();

	$form.WireTabs({
		items: $(".WireTab"),
		skipRememberTabIDs: ['delete_items']//@@todo not working? this tab being remembered
	});	
	

	
	/**
	 *  Add row - clone the last tr of the table to add custom menu items
	 */
	var clonePageRow = function() {
		$tr = $('table.menu_add_custom_items_table tr:last');
		$clone = $tr.clone();
		$clone.find('input[type=text]').attr('value','');

		$('table.menu_add_custom_items_table').append($clone);
		$clone.find('input:first').focus();
		return false;
	}
	
	$('.addrow').click(clonePageRow);
	//$(document).bind('keydown', 'ctrl+n', clonePageRow);

		
	/*
	*
	* nestedSortable js configurations
	*
	* @@todo: make configurable? At least some of these
	*	
	*/

	$('ol.sortable').nestedSortable({
		rootID: 0,//name given to items at the root level; default is null
		//startCollapsed: true,
		isTree: true,
		//protectRoot: true,
		disableNesting: 'mjs-nestedSortable-no-nesting',
		forcePlaceholderSize: true,
		handle: 'h4',
		helper:	'clone',
		listType: 'ol',
		items: 'li',
		maxLevels: 6,
		opacity: .6,
		placeholder: 'placeholder',
		revert: 250,
		tabSize: 25,
		tolerance: 'pointer',
		toleranceElement: '> h4',
		expandOnHover: 700,
		//disableNesting: //@@todo - not sure whether to add this
		//protectRoot: //@@todo - unsure: Whether to protect the root level (i.e. root items can be sorted but not nested, sub-items cannot become root items). Default: false
		//isAllowed (function) //@@todo - unsure: You can specify a custom function to verify if a drop location is allowed. Default: function(item, parent) { return true; }
		//errorClass //@@todo - unsure: The class given to the placeholder in case of error. Default: ui-nestedSortable-error
		
	});

	/*
	*
	* Grab items' parents on update [drag/drop]
	*
	*/

	$('div#accordion .sortable').sortable({
	
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
				*	Note, item_parent id is not the ID of the parent! may rename this. 
				*	The ID of the parent is the value of this input field, item_parent[]. Need the item_parent{$id} here for convenience.
				*
				*/
				
			}
		
		}

	});
	

	/*
	* Toggle view/hide individual menu item settings
	*
	*/
 
	$(".settings").hide();//hide div with menu items settings on load
	$('.toggle').click(function(e) {
	// show/hide the menu item settings of this item
		$(this).next(".settings").slideToggle(500);
		e.preventDefault(); // prevent default click <a> action from happening!
	});


		
});