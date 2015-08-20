var app = angular.module("courseApp", ['ui.bootstrap' ,'firebase']);

app.controller("CourseCtrl", function($scope, $firebaseObject, $firebaseAuth) {
	var ref = new Firebase("https://ncnu-course.firebaseio.com/course1");
	$scope.authObj = $firebaseAuth(ref);
	var obj = $firebaseObject(ref);
	obj.$bindTo($scope, "courses");
	// get arrary index

	$scope.score = function(index) {
		$('#myModalLabel').text($scope.courses[index].cname);
		var postsRef = ref.child(index).child('posts');	
		var postsObj = $firebaseObject(postsRef);
		postsObj.$bindTo($scope, "posts");


		$scope.addPost = function (recommendValue, messagesValue) {
			var authData = ref.getAuth();
			if(authData == null){
				alert("請先登入Facebook喲!!");
			} else{
				if (!messagesValue) {
					messagesValue = '';
				};
				var dateValue = Date.now();
				postsRef.push({
					userid: authData.facebook.id, 
					username: authData.facebook.displayName,
					img: authData.facebook.profileImageURL, 
					recommend: recommendValue,
					messages: messagesValue, 
					date: dateValue
				});
		 		$scope.course.post = [];
		 	}
		}

		$scope.getRecommendTure = function () {
			var tureNum = 0;
			angular.forEach($scope.courses[index].posts, function(value, key) {
				if (value.recommend == 1) {	
					tureNum++;
				}
			});
			return tureNum;
		}
		$scope.getRecommendFalse = function () {
			var falseNum = 0;
			angular.forEach($scope.courses[index].posts, function(value, key) {
				if (value.recommend == 0) {
					falseNum++;
				}
			});
			return falseNum;
		}
	}

	$scope.bug = function() {
		$('#bug').modal();
	}

	$scope.login = function() {
		ref.authWithOAuthPopup("facebook", function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
			//	console.log("Authenticated successfully with payload:", authData);
			}
		});
	}


});





