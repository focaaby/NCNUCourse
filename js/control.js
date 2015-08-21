var app = angular.module("courseApp", ['ui.bootstrap' ,'firebase']);

app.controller("CourseCtrl", function($scope, $firebaseObject, $firebaseAuth) {
	var ref = new Firebase("https://ncnu-course.firebaseio.com/course1");
	$scope.authObj = $firebaseAuth(ref);
	$scope.courses = $firebaseObject(ref);

	var key;
	$scope.score = function(index) {		
		key = index;
		$scope.myModalLabel = $scope.courses[key].cname;
		var postsRef = ref.child(key).child('posts');	
		$scope.posts = $firebaseObject(postsRef);
		var tureNum = 0;
		var falseNum = 0;
		angular.forEach($scope.posts, function(value, key) {
			if (value.recommend == 1) {	
				tureNum++;
				console.log($scope.posts + ', value' + value);
			} else {
				falseNum++;	
				console.log($scope.posts + ', value' + value);
			}
		});
		console.log( 'tureNum:' + tureNum  + ', falseNum:' + falseNum);
	}

	$scope.addPost = function (recommendValue, messagesValue) {
		//console.log('key: ' + key);
		var postsRef = ref.child(key).child('posts');	
		$scope.posts = $firebaseObject(postsRef);

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
			$scope.recommend = "";
			$scope.message = "";
		}
	}
	

	$scope.bug = function() {
		$('#bugModal').modal('show');
	}

	$scope.addReports = function(reportsValue) {
		var authData = ref.getAuth();
		var reportsRef = ref.parent().child('reports');	
		var dateValue = Date.now();
		if (!reportsValue) {
			alert('請輸入回報內容 QAQ');
		} else {
			reportsRef.push({
				userid: authData.facebook.id, 
				username: authData.facebook.displayName,
				reports: reportsValue, 
				date: dateValue
			});
			$scope.report = "";	
		}
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





