define("scribe-plugin-tab-indent", [], function() {
  return function(options) {
    options = options || {};

    return function(scribe) {
      scribe.el.addEventListener('keydown', function (event) {
        if (event.keyCode === 9) {
          event.preventDefault();

          var node = document.getSelection().anchorNode;
          var parentNode = (node.nodeType == 3 ? node.parentNode : node);

          for (var i = 0; i < (options.preventTags || []).length; i++) {
            if (options.preventTags.indexOf(parentNode.tagName.toLowerCase()) != -1) {
              return false;
            }
          }

          if (event.shiftKey) {
            scribe.getCommand("outdent").execute();
          } else if (scribe.getCommand("insertUnorderedList").queryState()) {
            scribe.getCommand("indent").execute();
          } else {
            scribe.getCommand("insertUnorderedList").execute();
          }
        }
      });
    };
  };
});
