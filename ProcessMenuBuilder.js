/** 
 *
 * Javascript file for PW Module ProcessMenuBuilder
 *
 * @author Francis Otieno (Kongondo) <kongondo@gmail.com>
 *
 * https://github.com/kongondo/ProcessMenuBuilder
 * Created March 2015, major update December 2017
 *
 */

function ProcessMenuBuilder($) { 
	
	/*************************************************************/
	// SCRIPT GLOBAL VARIABLES
	
	/*	@note:
		- global variables NOT prefixed with '$'.
		- function parameters and variables PREFIXED with '$'
	*/

    //var someVar, anotherVar;    

    /*************************************************************/
    // FUNCTIONS    
    
    /**
     * Asm Select: Hide children level inputs if selected page is 'Home'.
     *
     * @param object $sel The Asm Select.
     *
     */
	function hideAsmHomeChildrenLevelInputs($sel) {
		var $opt = $sel.children('option[value="1"]');			
		var $rel = null;
		if ($opt.length) {
			$rel = $opt.attr("rel");
			$("ol.asmList")
				.children('li[rel="' + $rel + '"]')
				.find("select.asm_include_children, input.asm_mb_max_level")
				.addClass("hide");
		}
	}

	/**
     * Autocomplete: Hide children level inputs if selected page is 'Home'.
     *
     * @param object $i The Autocomplete input.
     *
     */
	function hideAutocompleteHomeChildrenLevelInputs() {
		setTimeout(function () {
			var $lastAdded = $('#item_addpages_items li:last');
			var $lastAddedValue = $lastAdded.find('.itemValue').text();
			if (1 === parseInt($lastAddedValue)) {
				$lastAdded.find("select.ac_include_children, input.ac_mb_max_level")
				.addClass("hide");
			}
		},100);// delay		
	}
	
	/**
     * Page Select Multiple Select: Hide children level inputs if selected page is 'Home'.
     *
     * @param object $a The 'add pages' anchor of the Page Select Multiple.
     *
     */
	function hidePageListSelectMultipleHomeChildrenLevelInputs($a) {
		var $div = $a.closest("div.PageListItem");
		if ($div.hasClass("PageListID1")) {
		$('li.ui-state-default:not(".itemTemplate")')
			.children("span.itemValue")
			.filter(function() {
			// Matches exact string
			var $text = parseInt($(this).text());
			return $text === 1;
			})
			.parent()
			.find("select.pls_include_children, input.pls_mb_max_level")
			.addClass("hide");
		}
    }
    
    /**
     * Toggle select/unselect all menu items in the list of menus table..
     *
     * @param object $i The (un)select all checkbox input.
     *
     */
	function toggleAllCheckboxes($i) {
		if ($i.prop("checked")) $("input.toggle").prop("checked", true);
        else $("input.toggle").prop("checked", false);            
    }
    
    /**
     * Used to force send (POST) new tab value of NEW custom menu items.
     *
     * @param object $i The checkbox for (un)setting NEW custom menu item to open in a new tab.
     *
     */
	function toggleNewTabValue($i) {
		if ($i.prop("checked")) {
			$i.val(1);
			$i.parent().find("input.newtabhidden").val(1);
        }
        else {
			$i.val(0);
			$i.parent().find("input.newtabhidden").val(0);
        }	
    }
    
    /**
     * Toggle show/hide panels in Build Tab.
     *
     */
	function togglePanels() {
		
        /** toggle view/hide each menu's settings editor **/
        $("div.settings").hide();
        $(".item_expand_settings, .item_title_main").click(function() {
            var $id = $(this).attr("data-id");
            //$('#menu_edit'+id).toggle();
            $("#menu_edit" + $id).slideToggle(500);
            $("a")
                .find('[data-id="' + $id + '"]')
                .toggleClass("fa-caret-down")
                .toggleClass("fa-caret-up");
        });
            
        /** Toggle view/hide add page menu items panel **/
        $("#wrap_item_addpages").hide(); //hide li wrapper for add page menus items on load
        $("#add_page_menu_items").click(function(e) {
            // show/hide the asmSelect for adding page menu items
            $("#wrap_item_addpages").toggle(250);
			e.preventDefault(); //prevent default click <a> action from happening!
			e.stopPropagation();
        });
    
        /** Toggle view/hide add custom menu items panel **/
        $("#item_addcustom").hide(); //hide li wrapper for add custom menu items settings on load
        $("#add_custom_menu_items").click(function(e) {
            $("#item_addcustom").toggle(250);
			e.preventDefault();
			e.stopPropagation();
        });
    
        /** Toggle view/hide add pages selector menu items panel **/
        $("#wrap_item_addselector").hide(); //hide div for add custom menu items settings on load
        $("#add_selector_menu_items").click(function(e) {
            $("#wrap_item_addselector").toggle(250);
			e.preventDefault();
			e.stopPropagation();
        });
    
    }
   
    /**
     * Clone a row in the custom menu items inputs' table.
	 * 
	 * Used to add new custom menu items.
     *
     */
	function clonePageRow() {
		var $tr = $("table.menu_add_custom_items_table tr:last");
        var $clone = $tr.clone(true);
        $clone.find("input[type=text]").attr("value", "");
    
        $("table.menu_add_custom_items_table").append($clone);
        $clone.find("input:first").focus();
        return false;
    }
    
    /**
     * Remove row from the custom menu items inputs' table.
     * 
	 * @param object $a The trash icon anchor.
	 * 
     */
	function removeTr($a) {
		var $tr = $a.closest("tr");
        if ($tr.prev("tr").find("input").length) $tr.remove();
        return false;
    }
  
    /**
     * Remove a menu item added to the menu items tree/list.
     * 
     * Used in the menu sortable list.
     *
	 * @param object $a The trash icon anchor.
	 * 
     */
	function removeMenuItem($a) {
		var $li = $a.closest("li");
        $li.remove();
        return false;
    }
    
    /**
     * Remove all menu items.
     * 
     * Used in the menu sortable list.
     *
     */
	function removeAllMenuItems() {
		$("ol.sortable").empty();
	}
	
	/**
     * Hide other buttons when on delete tab, and restore them when leaving delete tab.
     *
	 * Copied from ProcessPageEdit.js
	 * 
     * @param object $newTab The tab we are changing to.
	 * @param object $oldTab The tab we've just left.
	 * 
     */
	function toggleShowSaveButtons($newTab, $oldTab) {
		if($newTab.attr('id') == 'ProcessMenuBuilderDelete') {
			$(".InputfieldSubmit:not(#wrap_submit_delete):visible").addClass('hide').hide();
		} else if($oldTab.attr('id') == 'ProcessMenuBuilderDelete') {
			$(".InputfieldSubmit.hide").removeClass('hide').show();
		}
	}
	
	/**
     * Check and trigger deletion of a single menu being edited.
     *
     * @param object $b The delete menu button.
     *
     */
	function menuDeleteConfirm($b) {
		if (!$("#menu_delete_confirm").is(":checked")) {
			$("#wrap_menu_delete_confirm label").effect("highlight", {}, 500);
			return;
		}
		$b.before("<input type='hidden' name='menu_delete' value='1'>");
		$("#MenuBuilderEdit").submit();           
    }
  
    /**
     * Inserts the extraheader labels in the Page select list items.
     * 
     * These are for CSS ID, Class, Include Children and Max Level.
	 * These are used in the modified select markup (autocomplete, asm and page list select multiple).
     *
     */
	function pagesSelectMBAddExtraLabels() {
		var $headers = $('div#menu_items_headers');
        $("#item_addpages_items,ol.asmList").before($headers);
    }
    
    /**
     * Get the general menu configs sent by the module ProcessMenuBuilder.
     *
     * @return object|false $jsProcessMenuBuilderConfigs Return configurations if found, else false.
     *
     */
	function processMenuBuilderConfigs() {
		// general menu configs
		var $jsProcessMenuBuilderConfigs = config.ProcessMenuBuilder;
		if (!jQuery.isEmptyObject($jsProcessMenuBuilderConfigs)) return $jsProcessMenuBuilderConfigs;
		else return false;
	}
	
	/**
     * Get the configs sent by the module ProcessMenuBuilder for Nested Sortable.
     *
     * @return object|false $jsNestedSortableConfigs Return configurations if found, else false.
     *
     */
	function processMenuBuilderNestedSortableConfigs() {
		// Nested Sortable configs
		var $jsNestedSortableConfigs = config.ProcessMenuBuilderNestedSortable;
		if (!jQuery.isEmptyObject($jsNestedSortableConfigs)) return $jsNestedSortableConfigs;
		else return false;
    }
    
    /**
     * Set the configs sent by the module ProcessMenuBuilder for Nested Sortable.
     *
     */
	function setNestedSortableConfigs($jsNestedSortableConfigs) {
		$("ol.sortable").nestedSortable({
			rootID: 0, // name given to items at the root level; default is null
            disableNesting: "mjs-nestedSortable-no-nesting",
            forcePlaceholderSize: true,
            handle: "div",
            helper: "clone",
            listType: "ol",
            items: "li",
            opacity: 0.6,
            placeholder: "placeholder",
            revert: 250,
            tolerance: "pointer",
            toleranceElement: "> div",
            containment: "ol#sortable_main",
        
            //****** custom ******
            maxLevels: $jsNestedSortableConfigs.config.maxLevels,
            //disableParentChange: $jsNestedSortableConfigs.config.disableParentChange,//@todo -not working; stops drag n drop
            expandOnHover: $jsNestedSortableConfigs.config.expandOnHover,
            //protectRoot: $jsNestedSortableConfigs.config.protectRoot,//@@todo - unsure: //@todo -not working; stops drag n drop
            //rtl: $jsNestedSortableConfigs.config.rtl,//@todo -not working; stops drag n drop
            startCollapsed: $jsNestedSortableConfigs.config.startCollapsed,
            tabSize: $jsNestedSortableConfigs.config.tabSize,
            doNotClear: $jsNestedSortableConfigs.config.doNotClear
            /*isTree: $jsNestedSortableConfigs.config.isTree,*/ //@todo -not working; stops drag n drop
            //disableNesting: //@todo - not sure whether to add this
        });
    }
    
    /**
     * Initiate WireTabs for use in the Process Module.
     *
     */
	function initWireTabs() {
		var $form = $("#MenuBuilderEdit");	
        // remove scripts, because they've already been executed since we are manipulating the DOM below (WireTabs)
        // which would cause any scripts to get executed twice
        $form.find("script").remove();
        // init Wire Tabs for this form
        $form.WireTabs({
            items: $(".WireTab"),
            skipRememberTabIDs: ["ProcessMenuBuilderDelete"],
            rememberTabs: true
        });
    }
  
    /**
     * Initiate Sortable on menu items.
     * 
     * Used in the menu sortable list drag and drop.
	 * This is used to create relationships between menu items (parent, child, etc).
     *
     */
	function initMenuSortable() {

		$("div#menu_sortable_wrapper .sortable").sortable({
            // FUNCTION TO CAPTURE PARENT IDs OF MENU ITEMS ON DRAG & DROP EVENT AND SAVE THESE FOR EACH MENU ITEM [in their individual hidden fields]
            update: function(event, ui) {
                // create an array of menu item_id's and their parent_id's. Update parent ids at the finish of the drag/drop event [function - toArray]
                var $order = $(".sortable").sortable("toArray");
    
                // loop through the values [this is a 2 dimensional object ]
                for (var $key in $order) {
					// the item id; retrieved via the key 'item_id' which is the name given by toArray	
					var $id = $order[$key].item_id;
					var $parent = $order[$key].parent_id; // the parent id		
					// update each menu item's hidden parent field value to store the new parent
					$("#item_parent" + $id).val($parent);
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
    
	}
	
	/**
     * Sets the active menu item in a Multi Lingual setup.
     *
	 * Used in cases where no active menu has been set.
	 * 
	 * @param object $s The span representing the menu item title.
     *
     */
	function multilingualSetActiveMenuItemLanguage($s) {
		var $p = $s.parent();
		var $c = $p.next("div.settings").children("div.menu_edit_language_selector");
		var $s = $c.find("span.menu_language_active");
		if (!$s.length) {
			var $f = $c.find("span.menu_language_selector ").filter(":first");
			$f.addClass("menu_language_active");
			var $id = $f.attr("data-language");
			$("div#" + $id).show();
		}
	}
	
	/**
     * Language tab selector for menu items in a Multi Lingual setup.
     *
     */
	function multilingualLanguageSelector($s) {
		$s.siblings(".menu_language_selector").removeClass("menu_language_active");		
		$s.addClass("menu_language_active");		
		var $id = $s.attr("data-language");
		var $p = $s.parent();
		$p.next("div.menu_language_wrapper").children().hide();
		$("div#" + $id).show();
    }

	/**
	 * Initialise this script.
	 *
	 */
	function init() {
            
		/* 01. #### WIRE TABS #### */
		initWireTabs();

		/* 02. #### MENU ITEMS LIST TABLE  #### */
		/** Fix for MarkupAdminDataTable: Don't enable sorting on first column with input checkbox **/
		//if ($.tablesorter != undefined) $.tablesorter.defaults.headers = {0:{sorter:false}};
		//if we are NOT on the menu items table, for sortable tables, disable sorting on first column
		if (!$("table").hasClass("no_disable")) {
			if ($.tablesorter != undefined)
			$.tablesorter.defaults.headers = { 0: { sorter: false } }; //works but requires two clicks to kick-in!
		}
		/* on change in select to limit menus show in table */
		//note: broken in PW dev 2.5.7. See issue #784 on GitHub - removeClass() fix
		$("#limit").change(function() {
			$(this).closest("form").removeClass("nosubmit").submit();
		}); // @note workaround for PW issue #784 (GitHub)

		/** Toggle all checkboxes in the list of menus table **/
		$(document).on("change", "input.toggle_all", function () {
			toggleAllCheckboxes($(this));
		});

		/* 03. #### BUILD MENU TAB #### */		
		/** MB CUSTOM AsmSelect OUTPUT **/
		$(".InputfieldAsmSelect select[multiple=multipleMB]").each(function() {
			var $t = $(this);
			var $options;
			if (typeof config === "undefined") $options = { sortable: true };
			else $options = config[$t.attr("id")];
			$t.asmSelectMB($options); // asmSelectMB() is our modified AsmSelect's function (see jquery.asmselect-mb.js)
		});

		/** insert extraheader labels in the Page select list items **/
		pagesSelectMBAddExtraLabels();

		/** Add a tr **/
		$("form#MenuBuilderEdit").on("click", "a.addrow", function() {clonePageRow()});
		/** Remove a tr **/
		$("form#MenuBuilderEdit").on("click", "a.remove_row", function () { removeTr($(this)) });
		/** Remove a menu item **/
		$("form#MenuBuilderEdit").on("click", "a.remove_menu", function () { removeMenuItem($(this)) });
		/** Remove all menu items **/
		$("form#MenuBuilderEdit").on("click", "a#remove_menus", function (e) {
			e.preventDefault();
			removeAllMenuItems();
		});	
		
		/** Toggle view/hide panels **/
		togglePanels();

		/** Hide children level inputs if selected item page is 'Home' **/
		// for modified InputfieldAsmSelect::render
		$(document).on("change", "select.asmSelect", function () { hideAsmHomeChildrenLevelInputs($(this)) });
		// for modified InputfieldPageAutocomplete::render
		$("input#item_addpages_input").on("autocompletechange", function (event, ui) {
			hideAutocompleteHomeChildrenLevelInputs();
		});
		// for modified InputfieldPageListSelectMultiple::render
		$(document).on("click", "li.PageListActionSelect a", function () {
			hidePageListSelectMultipleHomeChildrenLevelInputs($(this))			
		});			
		
		/** @note: for testing tab changes **/
		/* $(document).on('wiretabclick', function($event, $newTab, $oldTab) {
				console.log("Tab changed to: " + $newTab.attr('id')); 
		}); 
		*/
		
		/** hide other buttons when on delete tab, and restore them when leaving delete tab **/
		$(document).on('wiretabclick', function(event, $newTab, $oldTab) {
			toggleShowSaveButtons($newTab, $oldTab);
		});
		
		/** Force send custom items new tab value **/
		// we use a hidden input to send value based on 'checked' propert of new_tab checkbox
		// Toggle value of new tab + closest corresponding hidden input
		$("input.newtab").change(function () {toggleNewTabValue($(this))});

		/* 04. #### NESTEDSORTABLE CONFIGS #### */
		// nestedSortable custom configs for each menu (defined in ProcessMenuBuilder::nestedSortableConfigs())	
		var $jsNestedSortableConfigs = processMenuBuilderNestedSortableConfigs();
		if ($jsNestedSortableConfigs) setNestedSortableConfigs($jsNestedSortableConfigs);

		/** Sortable menu items **/
		initMenuSortable();

		/* 05. #### DELETE MENU TAB #### */
		// trigger a submit_delete submission. this is necessary because when submit_delete is an <input type='submit'> then
		// some browsers call it (rather than submit_save) when the enter key is pressed in a text field. This solution
		// by-passes that undesirable behavior.
		$("#menu_delete").click(function () {menuDeleteConfirm($(this))});

		/* 06. #### MULTI LINGUAL #### */
		// @note: only check if in multi lingual site
		var $jsProcessMenuBuilderConfigs = processMenuBuilderConfigs();
		if ($jsProcessMenuBuilderConfigs) {
			var $multiLingualUse = $jsProcessMenuBuilderConfigs.config.multilingual;
			if ($multiLingualUse) {
				/** Multi Lingual: if no active menu, set first language as active **/
				$("div.handle").on("click", "span.item_title_main", function () { multilingualSetActiveMenuItemLanguage($(this)) });	
				/** Multi Lingual: language selector **/
				$("div#menu_sortable_wrapper" ).on("click", "span.menu_language_selector", function() {
					multilingualLanguageSelector($(this));
				});			
			}
		}



	}

	// initialise script 
	init();
	
}// END ProcessMenuBuilder()


/*************************************************************/
// READY

jQuery(document).ready(function($) {
	ProcessMenuBuilder($);
});