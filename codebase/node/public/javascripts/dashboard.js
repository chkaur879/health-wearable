d3.csv('./csv/output.csv')
   .then(makeCharts);

function makeCharts(users) {
    var stepCounts = {};
    users.forEach(row => {
      var userId = row.id;
      var stepCount = parseInt(row.total_steps);
      if (!stepCounts[userId]) {
        stepCounts[userId] = 0;
      }
      stepCounts[userId] += stepCount;
    });

    /// Sort the step counts by descending order
    var sortedStepCounts = Object.entries(stepCounts)
    .sort((a, b) => b[1] - a[1]);

    // Get the top 3 users with maximum steps
    var topUsers = sortedStepCounts.slice(0, 3);

    // Get the labels and data for the pie chart
    var labels = topUsers.map(user => `User ${user[0]}`);
    var data = topUsers.map(user => user[1]);

    // Create the pie chart using Chart.js
    var pieChart = new Chart('chart1', {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    }
    });

    var userMap = new Map();
    for (var row of users) {
        var userId = row.id;
        var distance = parseFloat(row.total_distance);
        if (!userMap.has(userId)) {
            userMap.set(userId, { userId, distance: 0 });
        }
        userMap.get(userId).distance += distance;
    }

    // Sort the users by total distance in descending order
    var sortedUsers = Array.from(userMap.values()).sort((a, b) => b.distance - a.distance);

    // Get the top 3 users with the maximum distance traveled
    var topUsers = sortedUsers.slice(0, 3);
    // Get the user IDs and distance data
    userIds = topUsers.map(user => user.userId);
    var distanceData = topUsers.map(user => user.distance);
    var colors2 = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ];
      // Create a bar chart using Chart.js
      var chart2 = new Chart('chart2', {
        type: 'bar',
        data: {
          labels: userIds,
          datasets: [{
            label: 'Distance Traveled (meters)',
            data: distanceData,
            backgroundColor: colors2.slice(0, userIds.length),
            borderColor: colors2.slice(0, userIds.length).map(color => color.replace('0.2', '1')),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

    var groupedData = {};
    users.forEach(row => {
      var userId = row.id;
      var calories = parseInt(row.calories);
      if (groupedData[userId]) {
        groupedData[userId].calories += calories;
      } else {
        groupedData[userId] = { calories };
      }
    });

    // Get the user IDs and calorie data
    var userIds = Object.keys(groupedData);
    var caloriesData = Object.values(groupedData).map(user => user.calories);
    
    var chart3 = new Chart('chart3', {
    type: 'line',
    data: {
        labels: userIds,
        datasets: [{
        label: 'Total Calories Burned',
        data: caloriesData,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: true
            }
        }]
        }
    }
    });
    
}