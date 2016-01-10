var app = angular.module("courseApp", ['firebase', 'chart.js']);

app.controller("CourseCtrl", function($scope, $firebaseArray, $firebaseAuth) {
	var ref = new Firebase("https://ncnu-course.firebaseio.com/course1");
	$scope.authObj = $firebaseAuth(ref);
	$scope.courses = $firebaseArray(ref);

  	$scope.labels = ["推薦", "不推薦"];
  	
  	$scope.colours =['#5bc0de', '#d9534f'];

	var key;
	$scope.score = function(index) {
		key = index;
		$scope.postsBefore = 0;
		$scope.myModalLabel = $scope.courses[key].cname;
		var postsRef = ref.child(key).child('posts');
		$scope.posts = $firebaseArray(postsRef);
		$scope.recommend = "";
		$scope.message = "";

		$scope.tureNum = $scope.courses[index].recommend;
		$scope.falseNum = $scope.courses[index].unrecommend;
		$scope.data = [$scope.courses[index].recommend, $scope.courses[index].unrecommend];
		
		var authData = ref.getAuth();
		// check user command before or not
		angular.forEach($scope.courses[key].posts, function(value, key) {
			if (value.userid == authData.facebook.id) {	
				$scope.postsBefore = 1;
			}
		});
	}

	$scope.addPost = function (recommendValue, messagesValue) {
		var postsRef = ref.child(key).child('posts');
		var courseRef = ref.child(key);
		$scope.posts = $firebaseArray(postsRef);
		var authData = ref.getAuth();
		if(authData == null){
			alert("請先登入Facebook喲!!");
		} else{
			if (!messagesValue) {
				messagesValue = '';
			}
			if (recommendValue == 1) {	
				$scope.tureNum++;
				$scope.data[0]++;
			} else {
				$scope.falseNum++;	
				$scope.data[1]++;
			}
			courseRef.update({
				recommend: $scope.tureNum, 
				unrecommend: $scope.falseNum
			});
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
			$scope.postsBefore = 1;
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
		$('#bugModal').modal('hide');
	}

	$scope.login = function() {
		ref.authWithOAuthPopup("facebook", function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				window.location.reload();
			//	console.log("Authenticated successfully with payload:", authData);
			}
		});
	}

	$('#giveScore').on('hidden.bs.modal', function (e) {
		$scope.data = [0, 0];
	})
});