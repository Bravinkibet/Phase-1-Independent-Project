document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');

  fetch('https://date.nager.at/api/v2/publicholidays/2020/US')
    .then(response => response.json())
    .then(data => {
      const uniqueHolidays = removeDuplicates(data, 'name');

      // Check if Presidents' Day is in the array, and if not, add it at the third position
      const presidentsDay = uniqueHolidays.find(holiday => holiday.name === "Presidents' Day");
      if (!presidentsDay) {
        const presidentsDayIndex = 2; // Index of the third item
        uniqueHolidays.splice(presidentsDayIndex, 0, { name: "Presidents' Day", date: '2020-02-17' });
      }

      // Use map to transform the array of holidays into an array of task items
      const taskItems = uniqueHolidays.map(holiday => createTaskItem(holiday));

      // Append the task items to the task list
      taskItems.forEach(taskItem => {
        taskList.appendChild(taskItem);
      });

      // Calculate total number of holidays
      const totalHolidays = uniqueHolidays.reduce((total, holiday) => total + 1, 0);
      console.log('Total number of holidays:', totalHolidays);
    })
    .catch(error => console.error('Error fetching public holidays:', error));

  function createTaskItem(holiday) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskImage = document.createElement('img');
    taskImage.classList.add('holiday-image');
    taskImage.src = getHolidayImageURL(holiday.name);
    taskImage.alt = holiday.name;
    taskItem.appendChild(taskImage);

    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = holiday.name;

    const taskDate = document.createElement('span');
    taskDate.classList.add('task-date');
    taskDate.textContent = holiday.date;

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.textContent = 'Mark Complete';
    completeBtn.addEventListener('click', () => toggleTaskStatus(taskItem));
    

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(holiday, taskTitle));

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(taskItem));

    taskActions.appendChild(completeBtn);
    taskActions.appendChild(editBtn);
    taskActions.appendChild(deleteBtn);
    taskItem.appendChild(taskImage);
    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDate);
    taskItem.appendChild(taskActions);

    return taskItem;
  }

  function toggleTaskStatus(taskItem) {
    taskItem.classList.toggle('completed');
  }

  function editTask(holiday, taskTitle) {
    const newTitle = prompt('Edit holiday name:', holiday.name);
    if (newTitle !== null) {
      holiday.name = newTitle;
      taskTitle.textContent = newTitle;
    }
  }

  function deleteTask(taskItem) {
    taskItem.remove();
  }

  function getHolidayImageURL(holidayName) {
    // Mapping of holiday names to image URLs
    const imageUrls = {
      'New Year\'s Day': 'https://c.tadst.com/gfx/750w/fireworks-in-the-sky.jpg',
      'Martin Luther King, Jr. Day': 'https://www.cuddyfeder.com/wp-content/uploads/2021/01/MLK-Jr-Image-768x640.jpg',
      'Presidents\' Day': 'https://govbooktalk.gpo.gov/wp-content/uploads/2019/02/istock-happy-presidents-day.jpg',
      'Washington\'s Birthday': 'https://www.alreporter.com/wp-content/uploads/2019/02/AdobeStock_188700553-e1550492587350.jpeg',
      'Good Friday': 'https://www.vedantu.com/seo/content-images/12300c6f-dd1e-4a95-8a55-135a60a55d48.jpg',
      'Memorial Day': 'https://511pir.com/images/blog/Memorial_Day_2021_Landing.jpg',
      'Independence Day': 'https://static.toiimg.com/thumb/msid-85344804,imgsize-80236,width-400,resizemode-4/85344804.jpg',
      'Labor Day': 'https://berthoudsurveyor.com/wp-content/uploads/2020/09/Happy-Labor-Day-.jpg',
      'Columbus Day': 'https://c.tadst.com/gfx/750w/istock-1355916844.jpg',
      'Indigenous Peoples\' Day': 'https://www.nicoa.org/wp-content/uploads/2019/10/indigenous.jpg',
      'Veterans Day': 'https://www.hfcc.edu/sites/hfcmain/files/newsroom/photos/veterans-small-for-web.jpg',
      'Thanksgiving Day': 'https://www.thescienceacademystemmagnet.org/wp-content/uploads/2021/12/HappyThanksgiving.jpg',
      'Christmas Day': 'https://images.herzindagi.info/image/2023/Dec/history-of-christmas.jpg'
    };

    // Return the image URL corresponding to the holiday name
    return imageUrls[holidayName] || 'https://via.placeholder.com/150'; // Default image URL
  }

  // Function to remove duplicates from an array of objects based on a specific key
  function removeDuplicates(arr, key) {
    return arr.reduce((unique, item) => {
      const existing = unique.find(i => i[key] === item[key]);
      if (!existing) {
        unique.push(item);
      }

      return unique;
    }, []);
  }

  function clearTaskList() {
    taskList.innerHTML = '';
  }

  // Add event listener to a hypothetical "Clear List" button
  const clearListBtn = document.getElementById('clear-list-btn');
  clearListBtn.addEventListener('click', clearTaskList);

  // Add a mouseover event listener to the container
  const container = document.querySelector('.container');
  container.addEventListener('mouseover', function(event) {
    // Change background color when mouse enters the container
    if (event.target === this) {
      this.style.backgroundColor = '#f0f0f0';
    }
  });
});
