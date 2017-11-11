//require in data from the friends.js file
var friendData = require('../data/friends.js');

//exports the logic below using node express and allows it to be required in other files
module.exports = function(app){

	//gets data from friends.js file
	app.get('/api/friends', function(req, res){
		res.json(friendData)
	})

//uses logic below to update the data in the /api/friends route so that when new profiles are added the page is updated with their information and is pushed into the array of objects
	app.post('/api/friends', function(req, res){
		
		//adds the newest profilet to index[0] within the profilesArray as a JSON object
		friendData.unshift(req.body);
		res.json(true);
		
		//create new variables to be used later by the code
		//defines the newest profile, which is the one we will be comparing all other existing profiles to later
		var newestProfile = friendData[0]
		var matchArray = []

		//loops through all profiles required in through the friendData function and gets the difference of their scores compared to those of the newestProfile, then pushes those results into the matchArray for each comparison
		for (var i = 1; i < friendData.length; i++){

			var diff0 = Math.abs(newestProfile.scores[0] - friendData[i].scores[0])
			var diff1 = Math.abs(newestProfile.scores[1] - friendData[i].scores[1])
			var diff2 = Math.abs(newestProfile.scores[2] - friendData[i].scores[2])
			var diff3 = Math.abs(newestProfile.scores[3] - friendData[i].scores[3])
			var diff4 = Math.abs(newestProfile.scores[4] - friendData[i].scores[4])
			var diff5 = Math.abs(newestProfile.scores[5] - friendData[i].scores[5])
			var diff6 = Math.abs(newestProfile.scores[6] - friendData[i].scores[6])
			var diff7 = Math.abs(newestProfile.scores[7] - friendData[i].scores[7])
			var diff8 = Math.abs(newestProfile.scores[8] - friendData[i].scores[8])
			var diff9 = Math.abs(newestProfile.scores[9] - friendData[i].scores[9])
			var diffArray = []
			diffArray.push(diff0, diff1, diff2, diff3, diff4, diff5, diff6, diff7, diff8, diff9)

			//calculates the total from the differences array for each profile
			function getSum(total, num){
				return total + num;
			}
			var comparison = diffArray.reduce(getSum) 
			
			//prepends the matching score ('comparison') to the profile's scores
			friendData[i].scores.unshift(comparison)

			//pushes the comparison for each profile to the matchArray, so that all profile sum comparisons can be compared to one another to find the closest match
			matchArray.push(comparison)
			
		}
		//sorts the matchArray from smallest to largest number to determine the smallest difference
		var sortedArray = matchArray.sort(function(a, b) {return a - b})
		
		//for each profile, beginning with the second since the newestProfile is the point of comparison, we loop through to determine if the index[0] is a match to our existing profiles, the profile that matches is stored as a variable bestFriend and is the best match for our newestProfile
		var bestFriend
		for(var i = 1; i < friendData.length; i++){

			if(sortedArray[0]===friendData[i].scores[0]){
				bestFriend = friendData[i]
			}
			

		}
	//here we define the index variable as the indexOf the bestFriend we determined previously, from there we splice the array of all our profiles and reorder them so that the best match is at index[1] and is removed from anywhere else within the array--this is to make things easier for our ajax request to push the profile to the modal on the survey.html page
	var index = friendData.indexOf(bestFriend)

	function reOrder(){
		friendData.splice(index, 1)
		friendData.splice(1, 0, bestFriend)
	}
	reOrder();
				
//after all comparison logic is complete and our bestFriend is determined, we have to remove the first score in the scores array since it is the comparison for the current newestProfile; this gets our profiles back to their original scores so the next user that's entered is compared to accurate scores
for(var x = 1; x < friendData.length; x++){
	friendData[x].scores.shift()
}

})

}

