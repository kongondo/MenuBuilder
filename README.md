#Menu Builder
This Module allows you to easily create custom menus/navigation lists in the ProcessWire Admin Panel using drag and drop. In the backend, it uses the [nestedSortable](https://github.com/mjsarfatti/nestedSortable) jQueryUI plugin by Manuele J Sarfatti.


##Features
* Ability to create menus that do not mirror your ProcessWire Page Tree hierarchy/structure
* Menus can contain both ProcessWire pages and custom links
* Create menu hierarchies and nesting via drag and drop
* Lock down menus for editing
* Easily apply CSS IDs and Classes to each and every menu item if you wish
* Optionally set custom links to open in a new tab
* Readily view the structure and settings for each menu and menu item
* Multiple configurable ways to add menu items from ProcessWire pages - PageAutocomplete OR AsmSelect[default] AND ProcessWire Selector
* Using a Selector, you can do for example,  template=basic-page, limit-20, sort=title.
* Batch edit menus
* Menus stored as pages (note: just the menu, not the items!)
* Menu items stored as JSON in a field in the menu pages (empty values not stored)
* For page fields, you can specify a selector to return only those specified pages for selection in the page field (i.e. Asm and Autocomplete)
* For page fields, you can also add css classes and IDs as you add the items (similar to custom menu items)
* Menu settings for nestedSortable - e.g. maxLevels (limit nesting levels)
* Advanced features (e.g. add pages via selector, menu settings)  permissible to superadmins only
* Delete single or all menu items without deleting the menu itself

##How to Install

The module has two components


* ProcessMenuBuilder: for creating menus in the ProcessWire Admin
* MarkupMenuBuilder: for displaying menus in the frontend (unstyled, unordered list by default)

1.Install the module from within the ProcessWire admin or download the module and copy the file contents to **/site/modules/MenuBuilder/**
2.In Admin, click Modules > check for new modules
3.Click install ProcessMenuBuilder. The module will automatically install MarkupMenuBuilder
4.Go to Setup > Menu Builder and start creating your menus

##Note

* The module installs three fields: **'menu_items', 'menu_pages'** and **'menu_settings'** and one template **'menus'**. If any similarly named fields/template are already present on your site, the module will not install but throw an error instead. You would need to rename your fields/template first. 
* To allow access to the Menu Builder admin, a user must have the permission **menu-builder**. The persmission is created on install.
* Some Menu Builder admin options are only available to Supersusers. These include:
  * Specifying a ProcessWire selector to populate selectable pages in the AsmSelect/Pageautocomplete for adding menu items
  * Adding menu items using a ProcessWire selector
  * Changing the page field type for adding menu items to Pageautocomplete from the default AsmSelect
  * Allowing and saving HTML (markup) in menu item titles/labels

##How to Use

* Access Menu Builder in your ProcessWire admin and create a menu(s).
* Edit the menu and add items to it, dragging and dropping them in different positions as you wish.
* Once you've created a menu, you can view it in the frontend by loading it using MarkupMenuBuilder in a template file as follows.

````php

$menu = $modules->get('MarkupMenuBuilder');//Load the module. $menu is an example
//you can render by menu name, title, id or properly formatted array of menu items
echo $menu->render('Title of Your Menu');//render the menu by title
echo $menu->render('name-of-your-menu');//render the menu by name
echo $menu->render('1234');//render by ID

//To render by passing an array

//get the Menu Builder field menu_items for this menu. That is what your menu items JSON string is stored
$json = $pages->get(1234)->menu_items;
//convert the JSON string to an array. Here we assume the JSON string is not empty
$array = json_decode($json, true);

echo $menu->render($array);//render by array

````

You can render additional menus as well, e.g.

````php

echo $menu->render('sidenav');
````

You can additionally pass CSS class/id options to the method. See below for available options

````php
$options = array(
	'has_children_class' => 'has_children',
	'current_class' => 'current',
	'menu_css_id' => 'main',
	'menu_css_class' => 'nav',
);

echo $menu->render('sidenav, $options');
````

You can also use your own PHP (or even javascript) recursive function to display the menu by decoding the saved JSON string containing menu items and passing the resulting array to your function for traversal.

The CSS is up to you, of course.

#Available render Options

````php
$defaultOptions = array(

		'wrapper_list_type' => 'ul',//ul, ol, nav, div, etc.
		'list_type' => 'li',//li, a, span, etc.
		'menu_css_id' => '',//a CSS ID for the menu
		'menu_css_class' => '',//a CSS Class for the menu
		'submenu_css_class' => '',//CSS Class for sub-menus
		'has_children_class' => '',//CSS Class for any menu item that has children
		'first_class'=>'',//CSS Class for the first item in 
		'last_class' => '',
		'current_class' => '',

);
````

##Uninstall

Uninstall like any other ProcessWire module. Note that **All your menus will be deleted on uninstall!**. The associated fields and template above will also be deleted.

##Resources
* [Support Forum](http://processwire.com/talk/topic/4451-module-menu-builder/)

##License
GPL2

##Changelog

#Version 0.0.3
1.Option to allow markup in menu item title(label) - Supersusers only
2.Added more options to render() method, e.g. first, last classes

#Version 0.0.2
1.First Beta version
3.Menus saved as ProcessWire pages
4.Menu items saved as JSON in a field in Menu pages
5.Add menu items from ProcessWire pages using page fields (option to choose between PageAutocomplete and AsmSelect [default]) or a Selector (e.g. template=basic-page, limit-20).
6.Specify a selector to return only those specified pages for selection in the page field (i.e. asm and autocomplete)
7.For page fields, similar to custom menu items, add css classes and IDs as you add the items
8.Menu settings for nestedSortable - e.g. maxLevels (limit nesting levels)
9.Lock down menus for editing
10.Highly configurable MarkupMenuBuilder 

#Version 0.0.1
Initial alpha release


