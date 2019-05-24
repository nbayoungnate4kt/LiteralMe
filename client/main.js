import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collection.js';



Template.mainBody.helpers({
  profAll(){
    return userDB.find({}, {sort:{Likes: -1}});
  }
});

Template.mainBody.events({
  'click .js-thumbsup'(event, instance) {
    var likes = userDB.findOne({'_id':this._id}).Likes;
    var dislikes = userDB.findOne({'_id':this._id}).Dislikes;
    if(!likes){
    likes=0;
  }
  likes++;
  var ratio = (likes/(likes+dislikes)) *100;
  userDB.update({"_id":this._id}, {$set:{'Likes':likes, 'LikeRatio':ratio}});
  },

  'click .js-thumbsdown'(event, instance) {
    var likes = userDB.findOne({'_id':this._id}).Likes;
    var dislikes = userDB.findOne({'_id':this._id}).Dislikes;
    if(!dislikes){
    dislikes=0;
  }
  dislikes++;
  var ratio = (dislikes/(likes+dislikes)) *100;
  userDB.update({"_id":this._id}, {$set:{'Dislikes':dislikes, 'DislikeRatio':ratio}});
  },

  'click .js-showbook'(event, instance) {
    var modalname = '#viewinfo' + this._id;
  $(modalname).modal('show');
    var views = userDB.findOne({'_id':this._id}).Views;
    if(!views){
    views=0;
  }
  views++;
  userDB.update({"_id":this._id}, {$set:{'Views':views}});
  },

  'click .js-delete'(event, instance) {
  var profID = this._id;
  $("#" + profID).fadeOut("slow","swing",function(){
    userDB.remove({_id:profID});  
  });
  $('#editbook' + profID).modal('hide');
  },

  'click .js-addbook'(event, instance) {
    var title = $('#adduser input[id="bookTitle"]').val();
    var a_name = $('#adduser input[id="authorName"]').val();
    var image = $('#adduser input[id="bookCover"]').val();
    var desc = $('#adduser textarea[id="description"]').val();
    if(title==undefined||title==""){
      title = "UNKNOWN";
    }
    if(a_name==undefined||a_name==""){
      a_name = "UNKNOWN";
    }
    if(image==undefined||image==""){
      image = "book.jpg";
    }
    if(desc==undefined||desc==""){
      desc = "UNKNOWN";
    }
    $('#adduser input[id="bookTitle"]').val('');
    $('#adduser input[id="authorName"]').val('');
    $('#adduser input[id="bookCover"]').val('');
    $('#adduser textarea[id="description"]').val('');
    $('#adduser').modal('hide');
  userDB.insert({'bookTitle':title, 'authorName':a_name, 'bookCover':image, 'desc':desc, 'Likes':0, 'Dislikes':0, 'LikeRatio':0, 'DislikeRatio':0, 'Views':0});
  },

  'click .js-savebook'(event, instance) {
    var profID = this._id;
    var modalname = '#editbook' + this._id;
    var title = $(modalname + ' input[id="bookTitle"]').val();
    var a_name = $(modalname + ' input[id="authorName"]').val();
    var image = $(modalname + ' input[id="bookCover"]').val();
    var desc = $(modalname + ' textarea[id="description"]').val();
    if(title==""){
      title = this.bookTitle;
    }
    if(a_name==""){
      a_name = this.authorName;
    }
    if(image==""){
      image = this.bookCover;
    }
    if(desc==""){
      desc = this.desc;
    }
    $(modalname + ' input[id="bookTitle"]').val('');
    $(modalname + ' input[id="authorName"]').val('');
    $(modalname + ' input[id="bookCover"]').val('');
    $(modalname + ' textarea[id="description"]').val('');
    $(modalname).modal('hide');
  userDB.update({"_id":profID}, {$set:{'bookTitle':title, 'authorName':a_name, 'bookCover':image, 'desc':desc}});
  },
});