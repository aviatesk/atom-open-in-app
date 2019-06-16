# Atom Open-in-App

This very simple Atom package allows you open any of your file instantly from Atom within _any_ application you want.

![overview](https://github.com/aviatesk/atom-open-in-app/blob/master/assets/overview.gif?raw=true)


<h2> TOC </h2>

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=3 orderedList=false} -->
<!-- code_chunk_output -->

* [Main features](#main-features)
* [Usage](#usage)
* [Configuration](#configuration)
* [License](#license)
* [Acknowledgements](#acknowledgements)
* [Author](#author)

<!-- /code_chunk_output -->


## Main features

- Files can be opened both from text editor and tree view.
- You can open files easily from context menu, instantly with key bindings.
    * **Keyboard shortcut support is provided even on `.tree-view` element**.
- **Application bindings are configurable**: You can set default application in which files gonna be opened, and even more create file-extension to application mappings.

(_For developers, this package is developed with TypeScript, and thus the code can be a simple example for you to develop an Atom package with TypeScript. Any question or idea is welcome !_ 😆)


## Usage

You can open any of your file from context menu:
- **Right-click text-editor or tree-view -> Select `Open File in App`**

Or you can use keyboard shortcuts:
- (In text editor or tree-view focus) **Just type <kbd>Ctrl-Shift-B</kbd>**


## Configuration

**Application Bindings**:
- Binds file extensions to any of your application. This field should be a valid JSON mapping from an extension to a path to an application.
- E.g.: `{ ".html": "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", ".txt": "C:/Windows/System32/notepad.exe" }`(**both keys and values need to be wrapped by _double_ quotations**) will open every .html files in chrome and .txt files in notepad in Windows.

**Default Application**:
- Sets a default application in which files without any binding will be opened. If you leave this field blank, then the files without application-binding should be opened in a _default_ application, which would be detected by your OS.
- E.g.: `C:/Users/USERNAME/AppData/Local/Programs/Microsoft VS Code/bin/code`(**no need to wrap by double quotations this time**) would open every non-bound file in VS Code. (But you know, we Atom lovers should NOT do this _at any cost_ 😜 !)

> Configuration example on Windows: ~/.atom/config.cson

```coffee
"*":
    ...
    "open-in-app":
        applicationBindings: "{ \".html\": \"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe\", \".txt\": \"C:/Windows/System32/notepad.exe\" }"
        defaultApplication: "C:/Users/USERNAME/AppData/Local/Programs/Microsoft VS Code/bin/code"
    ...
```

## License

This package is under [MIT License](LICENSE.md).


## Acknowledgements

- While development, I cited considerable amount of code from [Open in Browser Atom.io Package](https://github.com/magbicaleman/open-in-browser) created by [@magbicaleman](https://github.com/magbicaleman).
- This package is developed by TypeScript, I a lot referred to [Atom TypeScript](https://github.com/TypeStrong/atom-typescript) for "how to develop Atom package with TypeScript".


## Author

- **KADOWAKI, Shuhei** - *Undergraduate@Kyoto Univ.* - [aviatesk]


<!-- Links -->

[aviatesk]: https://github.com/aviatesk
