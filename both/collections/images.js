Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images")]
});

Images.allow({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  download: function(){
    return true;
  },
  fetch: null
})
