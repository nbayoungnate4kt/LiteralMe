import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collection.js';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.mainBody.helpers({//template helpers put data into the template
	myJumbo(){
		return userDB.find({});
	}
});

Template.mainBody.events({//template events define and customize user interactions(events) within the template
	'click .js-Thumbsup'(event, instance) {
 		console.log("You clicked thumbsup");
 		var profID = this._id;
 		var numlikes = userDB.findOne({_id: profID}).Thumbsup;
 		if(!numlikes){
 			numlikes = 0;
 		}
 		numlikes= numlikes+1;
 		userDB.update({_id:profID}, {$set:{'Thumbsup':numlikes}});
  	},
  	'click .js-Thumbsdown'(event, instance) {
  		console.log("You clicked thumbsup");
  		var profID = this._id;
  		var numlikes = userDB.findOne({_id: profID}).Thumbsdown;
 		if(!numlikes){
 			numlikes = 0;
 		}
 		numlikes= numlikes+1;
 		userDB.update({_id:profID}, {$set:{'Thumbsdown':numlikes}});
  	},
  	'click .js-delete'(event,instance) {
  		var profID = this._id;
  		$("#" + profID).fadeOut("slow","swing",function(){
  			userDB.remove({_id:profID}); 	
  		});
  	},
  	'click .profEdit'(event,instance){
  		$('#modaledit').modal('show');
  		console.log("------")
  	}

});

Template.addbook.events({
	'click .js-save'(event, instance) {
		var fname = $('#exampleModal input[name="firstName"]').val()
		var lname = $('#exampleModal input[name="lastName"]').val()
		var img = $('#exampleModal input[name="Image"]').val()
		if(img ==""){
			img="book1.jpg"
		}
		console.log("The name is",fname,lname);
		$('#exampleModal input[name="firstName"]').val('')
		$('#exampleModal input[name="lastName"]').val('')
		$('#exampleModal input[name="Image"]').val('')
		$('#exampleModal').modal('hide');
		userDB.insert({'firstName':fname,'lastName':lname, 'Image':img});
  		
  },
}); 