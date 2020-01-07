# Atom Open-in-App

This very simple :atom: package allows you open any of your file instantly from Atom editor within _any_ application you want.

![overview](https://github.com/aviatesk/atom-open-in-app/blob/master/assets/overview.gif?raw=true)


## Features

- Files can be opened both from text editor and tree view.
- You can open files easily from context menu, instantly with key bindings.
    * **Keyboard shortcut support is provided on `.tree-view` panel as well**.
- **The bindings between file extension and application are configurable**: i.e. You can set a default application in which files gonna be opened, and also create additional file-extension to application mappings.


## Usage

You can open any of your file from context menu:
- Right-click text-editor or tree-view ⟶ Select `Open File in App` menu

Or you can use keyboard shortcuts:
- (with focusing text editor or tree-view) Just type <kbd>Ctrl-Shift-B</kbd>


## Configuration

#### Default application

`defaultApplication`:
- sets a default application in which files without any binding is going to be opened. If you leave this field blank, then files without application-binding will be opened in a "default" application, which is detected by your OS
- should be a `String` of a path to the default application (default `""`)
- e.g.: `"code"` would open every non-bound file in VS Code. (But you know, we, :atom: lovers, should NOT do this at any cost 😜 !)

#### File extension to application bindings:

`applicationBindings`:
- binds file extensions to any of your application
- should be `Object` that maps `String` of a file extension to `String` of a path to an application (default `{}`)
- e.g.: `{ ".html": "C:/\"Program Files (x86)\"/Google/Chrome/Application/chrome.exe", ".txt": "notepad.exe" }` will open every `.html` files in chrome and `.txt` files in notepad, in Windows OS

#### Configuration example

> ~/.atom/config.cson
```coffee
"*":
  ...
  "open-in-app":
    applicationBindings: { ".py": "code" } # edit Python in VSCode
    defaultApplication: "chrome" # open files in Chrome by default
  ...
```

## License

This package is under [MIT License](LICENSE.md).


## Acknowledgements

While development, I cited considerable amount of code from [Open in Browser Atom.io Package](https://github.com/magbicaleman/open-in-browser) created by [@magbicaleman](https://github.com/magbicaleman).


## Author

- **Shuhei Kadowaki** - *Undergraduate@Kyoto Univ.* - [aviatesk]


<!-- Links -->

[aviatesk]: https://github.com/aviatesk
