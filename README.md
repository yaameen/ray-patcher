Ray License Patcher
===================

Ray License Patcher is a tool for patching a binary file for the Ray app. It allows you to bypass the license verification mechanism in the app and use it without restrictions.

Installation
------------

To use this patcher, you need to have Node.js installed on your machine. You can download the latest version of Node.js from the official website.

Or use npm / yarn

```bash
npm i -g https://github.com/yaameen/ray-patcher
#or
yarn global add https://github.com/yaameen/ray-patcher
```

Usage
-----

To use the patcher, run the following command in the terminal:

bashCopy code

```bash
node path/to/patcher.js
```

The patcher will look for the Ray binary file (app.asar) in the default location `/Applications/Ray.app/Contents/Resources/app.asar` or in the location specified with the `--path` option. It will then extract the binary file to a folder named `extracted` or in the folder specified with the `--wd` option. After that, the patcher will modify the extracted binary file and write back the changes to the original binary file. Finally, it will remove the extracted folder.

The patcher also comes with several options:



```bash
-p, --path  [value]  Path of Ray binary (app.asar)
-w, --wd    <value>     Working directory
```

Support
-------

This patcher is for educational purposes only. The author does not take any responsibility for any harm caused by using this tool. If you have any questions or issues with the patcher, please contact the author.