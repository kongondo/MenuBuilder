#Menu Builder
This Module allows you to easily create custom menus/navigation lists in the ProcessWire Admin Panel using drag and drop. In the backend, it uses the [nestedSortable](https://github.com/mjsarfatti/nestedSortable) jQueryUI plugin by Manuele J Sarfatti.


##Features
*	Ability to create menus that do not mirror your ProcessWire Page Tree hierarchy/structure
*	Menus can contain both ProcessWire pages and custom links
*	Create menu hierarchies and nesting via drag and drop
*	Prevents editing of ProcessWire pages menu items' URLs
*	Easily apply CSS IDs and Classes to each and every menu item if you wish
*	Optionally set custom links to open in a new tab
*	Readily view the structure and settings for each menu and menu item
*	Multiple configurable ways to add menu items - PageAutocomplete, AsmSelect, Selector
*	Batch edit menus

##How to Install

This module has two components
*	ProcessMenuBuilder: for creating menus in the ProcessWire Admin
*	MarkupMenuBuilder: for displaying menus in the frontend (unstyled, unordered list)

1.	Download the module and copy the file contents to /site/modules/MenuBuilder/
2.	In Admin, click Modules > check for new modules
3.	Click install ProcessMenuBuilder. The module will automatically install MarkupMenuBuilder
4.	Go to Setup > Menu Builder and start creating your menus

##How to Use

Once you've created a menu, you can view it in the frontend by loading it using MarkupMenuBuilder in a template file as follows.

````php

$menu = $modules->get('MarkupMenuBuilder');//Load the module. $menu is an example
//you can render by menu name, title, id or properly formatted array of menu items
echo $menu->render('nameofyourmenu');//render the menu
````

You can render additional menus as well, e.g.

````php

echo $menu->render('sidenav');
````

You can additionally pass CSS class/id options to the method.

````php
$options = array(

	'has_children_class' => 'has_children',
	'current_class' => 'current',
	'menu_css_id' => 'main',
	'menu_css_class' => 'nav',

);

echo $menu->render('sidenav, $options');
````

The CSS is up to you, of course.


##Resources
*	[Support Forum](http://processwire.com/talk/topic/4451-module-menu-builder/)

##License
GPL2
