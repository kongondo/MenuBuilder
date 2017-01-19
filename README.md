# Menu Builder
This Module allows you to easily create custom menus/navigation lists in the ProcessWire Admin Panel using drag and drop. In the backend, it uses the [nestedSortable](https://github.com/mjsarfatti/nestedSortable) jQueryUI plugin by Manuele J Sarfatti.


## Features
* Visual menu builder
* Ability to create menus that do not mirror your ProcessWire Page Tree hierarchy/structure
* Menus can contain both ProcessWire pages and custom (external) links
* Create menu hierarchies and nesting via drag and drop
* Lock down menus for editing
* Easily apply CSS IDs and Classes to each and every menu item if you wish
* Optionally set custom links to open in a new tab
* Readily view the structure and settings for each menu and menu item
* For each menu, multiple configurable ways to add menu items from ProcessWire pages - PageAutocomplete, PageListSelectMultiple OR AsmSelect[default] AND ProcessWire Selector 
* Using a Selector, you can search for pages to add, for example, template=basic-page, limit=20, sort=title.
* Batch edit menus
* Menus stored as pages (note: just the menu, not the items!)
* Menu items stored as JSON in a field in the menu pages (empty values not stored)
* For page fields, you can specify a selector to return only those specified pages for selection in the page field (only applicable to Asm and Autocomplete)
* For page fields, you can also add CSS classes and IDs as you add the items (similar to custom menu items)
* Menu settings for nestedSortable - e.g. maxLevels (limit nesting levels)
* Advanced features (e.g. add pages via selector, menu settings) permissible to superadmins only
* Delete single or all menu items without deleting the menu itself
* Easily render menus and breadcrumbs in the frontend using MarkupMenuBuilder
* Optionally create complex menu structures by returning only menu items using MarkupMenuBuilder and passing these to your custom recursive menu function
* Fully multilingual

## How to Install

The module has two components:

* ProcessMenuBuilder: for creating menus in the ProcessWire Admin
* MarkupMenuBuilder: for displaying menus in the frontend (unstyled, unordered list by default)

1. 	Install the module from within the ProcessWire admin or download the module and copy the file contents to **/site/modules/MenuBuilder/**
2. 	In Admin, click Modules > check for new modules
3. 	Click install ProcessMenuBuilder. The module will automatically install MarkupMenuBuilder
4. 	Go to Setup > Menu Builder and start creating your menus

## Note

* The module installs three fields: **'menu_items', 'menu_pages'** and **'menu_settings'** and one template **'menus'**. If any similarly named fields/template are already present on your site, the module will not install but throw an error instead. You would need to rename your fields/template first. 
* To allow access to the Menu Builder admin, a non-superuser must have the permission **menu-builder**. The permission is created on install.
* Some Menu Builder admin options are only available to Superusers by default. Other users would require specific permissions as described below.

## API

MarkupMenuBuilder has three methods available to users.

### render()

This method renders a menu/navigation list of a specified menu. The method accepts two arguments/parameters:

````php
render($menu, $options);

````

The first argument is not optional and can be a Page object, a title, name or id of a menu or an array of menu items returned from a menu's menu_items field. **Note that for multilingual environments, you cannot pass the method a title or a name; only the other three choices will work**.
The second argument is an optional array and will fall back to defaults if no user configurations are passed to the method.

The available **render()** options are:

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
		'default_title' => 0,//0=show saved titles;1=show actual/current titles
		'include_children' => 4,//show 'natural' MB non-native descendant items as part of navigation
		'm_max_level' => 1,//how deep to fetch 'include_children'
		'current_class_level' => 1,//how high up the ancestral tree to apply 'current_class'
		'default_class' => '',//a CSS class to apply to all menu items

);
````

### renderBreadcrumbs()

This method renders a breadcrumb navigation of a specified menu. The method also accepts two arguments/parameters:

````php
render($menu, $options);

````

Similar to **render()**, the first argument is not optional and can be a Page object, a title, name or id of a menu or an array of menu items returned from a menu's menu_items field. This means that you only have to retrieve a menu once and pass that to both **render()** and **renderBreadcrumbs()**. **Note that for multilingual environments, you cannot pass the method a title or a name; only the other three choices will work**.
The second argument is an optional array and will fall back to defaults if no user configurations are passed to the method. The options are very similar to those of **render()**. Hence, as applicable, you can create one array of options and pass it to both **render()** and **renderBreadcrumbs()**. The methods will pick up what's of relevance to them.

The available **renderBreadcrumbs()** options are:

````php
$defaultOptions = array(

		'wrapper_list_type' => 'ul',//ul, ol, nav, div, etc.
		'list_type' => 'li',//li, a, span, etc.
		'menu_css_id' => '',
		'menu_css_class' => '',
		'current_css_id' => '',
		'divider' => '&raquo;',// e.g. Home >> About Us >> Leadership
		//prepend home page at the as topmost item even if it isn't part of the breadcrumb
		'prepend_home' => 0,//=> 0=no;1=yes
		'default_title' => 0,//0=show saved titles;1=show actual/current titles
		'include_children' => 4,//show 'natural' MB non-native descendant items as part of navigation
		'b_max_level' => 1,//how deep to fetch 'include_children'

);
````

### getMenuItems()

This is a new method since version 0.1.5. The method greatly simplifies the creation of custom complex menus. Use this method instead of **render()** if you wish to have total control over your menu logic and markup. Examples of how to use this method can be found in [these gists](https://gist.github.com/kongondo/a478e2a9274fc29f5d7cdb93a8166989) as well as in this [post](https://processwire.com/talk/topic/4451-menu-builder/?p=120639) in the support forum. The method accepts three arguments:


````php
getMenuItems($menu, $type, $options);

````

Similar to **render()**, the first argument is not optional and can be a Page object, a title, name or id of a menu or an array of menu items returned from a menu's menu_items field. The second argument determines the type of items that the method will return. A value of 1 will return an array and one of 2 (the default) will return a WireArray Menu Object. The third argument is similar to the $options passed to **render()**. **Please note that only three options are applicable to getMenuItems(), i.e.** *default_title, default_class and current_class_level*. You can, of course, create a function that will accept passing additional options (similar to **render()**) as an argument.


### Options

* Unless indicated otherwise, all the following options apply to both **menus (render())** and **breadcrumbs (renderBreadcrumbs())**.
* Only three options apply to **getMenuItems()**: *default_title, default_class and current_class_level*.
* The term navigation is used in the context of both menus and breadcrumbs. 
* The term 'Class(es)' indicates that multiple CSS Classes can be applied, separated by space.


1. **wrapper_list_type**:  Outer HTML/Markup wrapper for navigation items. The default is **&lt;ul&gt;**.  You can also use **&lt;div&gt;**,  **&lt;nav&gt;**,  **&lt;ol&gt;**, etc, to suit your needs.
2. **list_type**:  The HTML/Markup wrapper for the navigation items themselves. The default is **&lt;li&gt;**.  You can also use **&lt;span&gt;**, etc or even nothing. For menus, in case you specify you want to use nothing, i.e. **'list_type' => ''**, nagivation items' CSS Class(es) and IDs will be applied to the  **&lt;a>, i.e. the link, rather than the default which would have been the list type.
3. **menu_css_id**:  A CSS ID applied to the top-most **'wrapper_list_type'**, i.e. the outermost HTML/Markup wrapper for navigation items. Nothing is applied by default unless you specify you want to use the option.
4. **menu_css_class**:  A CSS Class applied to the top-most **'wrapper_list_type'**, i.e. the outermost HTML/Markup wrapper for navigation items. Nothing is applied by default unless you specify you want to use the option.
5. **submenu_css_class**:  **For menus only**, a CSS Class(es) applied to any nested **'wrapper_list_type'**, i.e. inner HTML/Markup wrapper for sub-menus. Nothing is applied by default unless you specify you want to use the option.
6. **has_children_class**:  **For menus only**, a CSS Class(es) applied to the **'list_type'** of any menu item that has children items, i.e. a parent menu item or in other words, a menu item containing one or more nested menu items. Nothing is applied by default unless you specify you want to use the option.
7. **first_class**:  **For menus only** and at all menu levels (i.e. nesting), a CSS Class(es) applied to the **'list_type'** of any menu item that is at the top-most position at each menu level. Nothing is applied by default unless you specify you want to use the option.
8. **last_class**:  **For menus only** and at all menu levels (i.e. nesting), a CSS Class(es) applied to the **'list_type'** of any menu item that is at the bottom-most position at each menu level. Nothing is applied by default unless you specify you want to use the option. At any level, if there is only a single menu item, it means that it is both the first and last menu item. If you specified both **'last_class'** and **'first_class'** in your menu options, that menu item will have both of these applied to it.
9. **current_class**:  **For menus only**, a CSS Class(es) applied to the **'list_type'** of the current menu item, i.e. the menu item that corresponds to the page that is currently being viewed in your browser. Nothing is applied by default unless you specify you want to use the option.
0. **current_css_id**:  **For breadcrumbs only**, a CSS ID applied to the **'list_type'** of the current breadcrumb item, i.e. the breadcrumb item that corresponds to the page that is currently being viewed in your browser. Nothing is applied by default unless you specify you want to use the option. Note that by default, current breadcrumb items are not wrapped around **&lt;a&gt;** (anchor/link) tags as it makes no sense to do so.
1. **default_class**:  **For menus only** and at all menu levels (i.e. nesting), a CSS Class(es) applied to each menu item (e.g. a Bootstrap or Foundation CSS Class).
2. **divider**:  **For breadcrumbs only**, a HTML Character Entity applied after the anchor tag **&lt;a&gt;** of breadcrumb items to indicate ancestry, i.e. items to the left of the divider are ancestral parents, grandparents, great grandparents, etc. to the breadcrumb item on the right of the divider. The default character used is **&raquo;**. Note that if there is only one breadcrumb item in the navigation, the divider is not applied. Also, it is not applied after the last breadcrumb item which is always the current breadcrumb item. You are not limited to using [HTML Character Entities](http://dev.w3.org/html5/html-author/charref) but can use whatever character suits your needs or nothing at all by specifying **'divider' => ''** in your options.
3. **prepend_home**:  **For breadcrumbs only**, specifying this option prepends your website's 'Homepage' title and URL as a breadcrumb as the topmost item in the navigation even if it isn't ancestrally part of the breadcrumb. This option is not applied by default. To use it specify **'prepend_home' => 1** in your options array.
4. **default_title**:  Controls whether to display Menu Builder saved menu item titles/labels versus displaying pages' actual/current titles.  This is useful in scenarios where, for example, you need dynamic titles such as in a multilingual environment where you would want navigation labels to change depending on the current language. The default option is to display saved titles. To instead display actual titles, set option to **'default_title' => 1** in your options array.
5. **include_children**:  Controls whether to display viewable descendant ProcessWire pages (children, grandchildren, etc.) of Menu Builder ProcessWire pages' navigation items at runtime as opposed to editing and saving them in Menu Builder admin. This is useful in a number of cases. For instance, you may wish to limit the number of menu items appearing in a particular menu in the the Menu Builder admin, e.g. in cases where these are many. This option can be applied globally (i.e. at a menu-level/$options level) and locally (at a menu-item-level). Item-level settings mean that only children of the specified item will be included. The 'include_children' option is disabled by default. Please see below for further details on how to use the feature.
6. **m_max_level**:  This is a menu-only option related to the **include children** feature. It limits the depth from within which viewable descendant pages can be retrieved for display in a menu. The default is 1. This means that only fetch immediate children. A value of 2 means fetch both children and grandchildren, etc. The option can be applied globally and locally as explained previously.
7. **b_max_level**:  This is breadcrumb-only option related to the **include children** feature. It limits the depth from within which viewable descendant pages can be retrieved for display in a breadcrumb. The default is 1. This means that only fetch immediate children. A value of 2 means fetch both children and grandchildren, etc. The option can only be applied globally.
8. **current_class_level**: Using this option, you can specify how high up the menu tree you want to apply the **'current_class'** to the current item's ancestors. The default is 1, meaning (if specified) apply the **'current_class'** to only the current item. A setting of 3 implies apply it to the current item, its parent and grandparent, etc. In short, the option can be used to show some or all 'active/current' menu items at various levels in your menu. This option only applies to menus and not breadcrumbs.

## How to Use

* Access Menu Builder in your ProcessWire admin and create a menu(s).
* Edit the menu and add items to it, dragging and dropping them in different positions as you wish.
* Once you've created a menu, you can view it in the frontend by loading it using MarkupMenuBuilder in a template file as follows.

#### Rendering a Menu

The simplest way to render a menu is to use the method **render()**. It is straightforward and can be passed various options to customise your menu. However, for the ultimate flexibility and total freedom, especially for complex menu structures, we recommend that you use the method **getMenuItems()**. Please note that the method **getMenuItems()** will not return a menu out of the box. Instead, it returns menu items that you can optionally manipulate, traverse using any recursive function (or for simpler menus, nested foreachs) and output within a HTML structure of your choosing. It means that you can apply logic within your chosen recursive function (or loop) to output extra details with your menu, for instance grab some data from a field within the pages that your menu items represent. Another example would be to show some parts of the menu only when a user is logged in, etc. If working with the Menu object, it means you can easily add properties to some or all of the menu items at runtime. It also means you have all the powerful WireArray [methods](http://processwire.com/api/arrays/) at your disposal (don't touch sort though!).

````php

//load the module
$menu = $modules->get('MarkupMenuBuilder');//Load the module. $menu is an example

/**you can render by menu Page object, name, title, id or properly formatted array of menu items**/

//render by name, title or id
echo $menu->render('Title of Your Menu');//render the menu by title
echo $menu->render('name-of-your-menu');//render the menu by name
echo $menu->render('1234');//render by ID

//render by passing a Page object
$m = $pages->get(1234);
echo $menu->render($m);//render by Page object

//render by passing an array
//get the Menu Builder field menu_items for this menu. That is where your menu items JSON string is stored
$json = $pages->get(1234)->menu_items;
//convert the JSON string to an array. Here we assume the JSON string is not empty
$array = json_decode($json, true);
echo $menu->render($array);//render by array

````

You can render additional menus as well, e.g.

````php

echo $menu->render('sidenav');
````

You can additionally pass CSS class/id options to the method. See above for available options.

````php
$options = array(
	'has_children_class' => 'has_children',
	'current_class' => 'current',
	'menu_css_id' => 'main',
	'menu_css_class' => 'nav',
);

echo $menu->render('sidenav', $options);
````

Examples of more complex menus utilising the method **getMenuItems()** using various recursive menu functions can be seen at [these gists](https://gist.github.com/kongondo/a478e2a9274fc29f5d7cdb93a8166989).

#### Rendering Breadcrumbs

Rendering breadcrumbs is quite similar to the above, the only difference being the method you use and some of the options that can be used to configure the output.

````php

//load the module
$menu = $modules->get('MarkupMenuBuilder');//Load the module. $menu is an example

/**you can render by menu Page object, name, title, id or properly formatted array of menu items**/

//render by name, title or id
echo $menu->renderBreadcrumbs('Title of Your Menu');//render the menu by title
echo $menu->renderBreadcrumbs('name-of-your-menu');//render the menu by name
echo $menu->renderBreadcrumbs('1234');//render by ID

//render by passing a Page object
$m = $pages->get(1234);
echo $menu->renderBreadcrumbs($m);//render by Page object

//render by passing an array
//get the Menu Builder field menu_items for this menu. That is where your menu items JSON string is stored
$json = $pages->get(1234)->menu_items;
//convert the JSON string to an array. Here we assume the JSON string is not empty
$array = json_decode($json, true);
echo $menu->renderBreadcrumbs($array);//render by array

````

Additionally, you can pass some options to the method. See above for available options.

````php
$options = array(
		'wrapper_list_type' => 'div',
		'list_type' => 'span',
		//'list_type' => '',//if empty, no tag will be applied + no CSS ID
		'menu_css_id' => 'crumbs',
		'menu_css_class' => 'trail',
		'current_css_id' => 'current',
		'divider' => '&ast;',
		'prepend_home' => 1
);

echo $menu->renderBreadcrumbs(1234, $options);
````

#### Using the Include Children Feature

This is a flexible and powerful feature that you can leverage to produce all sorts of dynamic navigation for your ProcessWire website. With lots of power comes responsibility. The features should only be enabled (see relevant permission below) for users who know what they are doing. For example, a user could unknowingly use the feature to include descendant pages of a menu item that has hundreds of descendants, leading to undesirable effects. 

#####  Menu-Level Values

At the global/menu/API-level, the following values can be passed with 'include_children'. This is useful if you want to override some item-level settings. The priority order of the settings and in comparison to item-level settings are explained further below.

* **0**: Overrides all settings, global and local and suppresses output of 'include_children'.
* **1**: Include children of all navigation items but only in the menu unless specified otherwise in item-level setting. 
* **2**: Include children of all navigation items but only in the breadcrumbs unless specified otherwise in item-level setting. 
* **3**: Include children of all navigation items in both the menu and breadcrumbs unless specified otherwise in item-level setting. This assumes you are passing the same options to both **render()** and **renderBreadcrumbs()**.
* **4**: Do not include children of any navigation item unless specified otherwise in item-level setting. This is the default setting (automatically applied) and does not need to be specified in your $options.


##### Item-Level Values

At the local/admin/item-level, the following values can be saved with each navigation item either when creating or editing the menu item in the Menu Builder admin. This is useful when you want fine-grained control over 'include_children' output. The priority order of the settings and in comparison to menu-level settings are explained later below.

* **No**: This is the default value; It means do not include children of this menu item unless overridden by a menu-level setting.
* **Menu**: Include children of this navigation item but only in the menu unless overridden by a **0** menu-level setting. 
* **Breadcrumbs**: Include children of this navigation item but only in the breadcrumbs unless overridden by a **0** menu-level setting. 
* **Both**: Include children of this navigation item in both the menu and breadcrumbs overridden only by a **0** menu-level setting. 
* **Never**: Never include children of this navigation item.


The combined (menu- and item-level) order of descending priority (i.e. a setting cannot override the setting above it) for these 'include_children' settings is as follows:

* **0** / **Never**
* **Menu** / **Breadcrumbs** / **Both**
* **1** / **2** / **3**
* **4** / **No**

As a sanity check, in the Menu Builder admin, a navigation item made up of your ProcessWire 'homepage' cannot have its children included/excluded since it is the parent of all pages. In addition, you will only see 'include_children' inputs in the Menu Builder admin when both the feature is enabled and you have the permission **menu-builder-include-children** (or are a superuser; more below under Permissions). Finally, note that if a user without this permission edits a menu that was previously edited by a user with the permission, any 'include_children' item-level settings will be lost.

#### Other Usage Notes

Note that you are not limited to using MarkupMenuBuilder. You can also use your own PHP (or even JavaScript) recursive function to display your menu by decoding the saved JSON string containing menu items and passing the resulting array to your function for traversal. The CSS is up to you, of course. Here's a nice [example](https://processwire.com/talk/topic/4451-menu-builder/?p=99003) from a forum member.


By default, if using AsmSelect or PageAutocomplete to select pages to add to your menu, the module will return a maximum of 50 pages. In that case, you might run into the 'not all my selectable pages are displayed [issue](https://github.com/kongondo/MenuBuilder/issues/21)'. You have two choices to resolve this. One, use PageListSelectMultiple instead. Alternatively, add a custom selector in the text field 'Pages selectable in menu' (main tab). For instance, *limit=50*. Or *limit=50, sort=title* or any other valid ProcessWire selector. You will either need to be logged in as a superuser or have the permission **menu-builder-selectable** in order to do this.

## Permissions

You can use the following permissions to control visibility and access to various advanced settings of Menu Builder by non-superusers. In ProcessWire, by default, Superusers inherit all permissions. **Note that you will have to create and apply the permissions yourself using the normal ProcessWire way**, i.e.

* Create a role, e.g. **menu-editor**.
* Create **permissions** and add assign them (when editing your role) to the role you created. 
* Create a **user** and assign them the role with the Menu Builder permissions.

There are 8 permissions at your disposal for fine-grained access control of your Menu Builder admin.

1. **menu-builder-lock**
This permission allows your non-superusers to lock and unlock menus using the 'Actions Panel' in Menu Builder's admin main page. **Note two things**:
(i)  This permission takes a whitelist approach. If this permission does not exist on your system (i.e. has not yet been created or is present but unpublished), by default, all users will be able to lock/unlock menus.
(ii)  The permission only kicks in if it is found. In that case, users without the permission will not be able to lock/unlock menus.

2. **menu-builder-delete**
This permission allows your non-superusers to trash and delete menus using either the 'Actions Panel' in Menu Builder's admin main page or, when editing a single menu, via the 'Delete' tab. **Note two things**:
(i)  This permission takes a whitelist approach. If this permission does not exist on your system (i.e. has not yet been created or is present but unpublished), by default, all users will be able to trash and delete menus.
(ii)  The permission only kicks in if it is found. In that case, users without the permission will not be able to trash or delete menus.

3. **menu-builder-selector**
This permission allows your non-superusers to add ProcessWire pages as menu items using a ProcessWire selector. This permission (**and all the rest below**) takes a blacklist approach. The permission does not need to exist in your system to kick in and by default all non-superusers are not able to add pages as menu items using selectors. This means that if you intend that only superusers will be allowed to use selectors in this manner, *there is no need to create the permission*. Only create and apply it if you wish to grant a particular non-superuser this feature. **The same applies to all the following permissions**.

4. **menu-builder-selectable**
This permission allows non-superusers to specify ProcessWire pages that are selectable as menu items in either of two configurable page fields in Menu Builder, i.e. AsmSelect or PageAutocomplete (BUT not PageListSelectMultiple).

5. **menu-builder-markup**
This permission allows your non-superusers to allow/disallow the use of markup/HTML in menu item titles/labels.

6. **menu-builder-settings**
This permission allows non-superusers to edit nestedSortable settings, for instance set maxLevels (that controls number of nesting levels in a menu).

7. **menu-builder-page-field**
This permission allows non-superusers to change the page field type used to select ProcessWire pages to add as menu items, i.e. toggle between AsmSelect [default], PageAutocomplete or PageListSelectMultiple.

8. **menu-builder-include-children**
This permission allows non-superusers to set and use the include children feature.

## Uninstall

Uninstall like any other ProcessWire module. Note that **All your menus will be deleted on uninstall!**. The associated fields and template above will also be deleted.

## Resources
* [Support Forum](http://processwire.com/talk/topic/4451-module-menu-builder/)

## License
GPL2

## Changelog

#Version 0.1.7
1. Fixed minor bug that affected display of titles of menu items with apostrophes in menu settings.
2. Code cleanup.

#Version 0.1.6
1. Fixed JS Bug where select all checkbox was not working in Menu Builder dashboard.
2. Fixed issue where InputfieldMarkup would not properly render HTML in descriptions.

#Version 0.1.5
1. Added method getMenuItems that greatly simplifies the creation of complex custom menus.

#Version 0.1.4
1. Moved first tab 'Main' to become the third tab and renamed it to 'Settings' for better UX.

#Version 0.1.3
1. Fixed bug where on uninstalling the module, menu pages in the trash would not get deleted, throwing an error when attempting to delete their template.

#Version 0.1.2
1. As per a request, added ability to use 'Page List Select Multiple' page field to select pages to add to menu items. This is in addition to the existing AsmSelect and PageAutocomplete.
2. Fixed bug where 'new_tab' setting would not be reliably applied to new custom links menu items.

#Version 0.1.1
1. Fixed bug relating to getLanguageValue() (issues #22 and #25).
2. Fixed bug where 'has_children' would not be applied to a menu item whose children were included 'natively'.
3. Switched to $this->wire('pages') from wire('pages') (and similar).
4. As per request at issue #18, added option 'default_class' to enable application of a default CSS class to every menu item at API level.

#Version 0.1.0
1. 	Cleaned-up HTML output by MarkupMenuBuilder.

#Version 0.0.9
1. 	Fixed bug in 'current_class_level' when 'include_children' is active.

#Version 0.0.8
1. 	Added new feature 'include children'. Allows global (menu-level) or item-level inclusion of a ProcessWire page menu item's 'natural' descendants (children, grandchildren, etc) in menus/breadcrumbs at runtime. This means such pages do not have to be added as part of the navigation during editing in Menu Builder.
2. 	Added a 'current_class_level' to specify how far up menus the 'current_class' should be applied (i.e. current/active parents).
3. 	Permission 'menu-builder-included-children' added to limit access to the new feature 'include children'.

#Version 0.0.7
1. 	Added multilingual support for saving and displaying menus/breadcrumbs.

#Version 0.0.6
1. 	Added method in MarkupMenuBuilder for rendering breadcrumbs - renderBreadcrumbs().
2.  Can now also pass Page object to method render() to render menu items/breadcrumbs

#Version 0.0.5
1. 	Corrected some markup errors.

#Version 0.0.4
1. 	Added various permissions to control visibility and editing of advanced settings

#Version 0.0.3
1. 	Option to allow markup in menu item title (label) - superusers only
2. 	Added more options to render() method, e.g. first, last classes

#Version 0.0.2
1.	First Beta version
2.	Menus saved as ProcessWire pages
3.	Menu items saved as JSON in a field in Menu pages
4.	Add menu items from ProcessWire pages using page fields (option to choose between PageAutocomplete and AsmSelect [default]) or a Selector (e.g. template=basic-page, limit-20).
5.	Specify a selector to return only those specified pages for selection in the page field (i.e. asm and autocomplete)
6.	For page fields, similar to custom menu items, add CSS classes and IDs as you add the items
7.	Menu settings for nestedSortable - e.g. maxLevels (limit nesting levels)
8.	Lock down menus for editing
9.	Highly configurable MarkupMenuBuilder


#Version 0.0.1
Initial alpha release
