document.addEventListener('DOMContentLoaded', function() {
  var voiceBtn = document.getElementById('voiceSearchBtn');
  if (voiceBtn) {
    if ('webkitSpeechRecognition' in window) {
      voiceBtn.addEventListener('click', function() {
        var recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = function(event) {
          var input = document.getElementById('searchInput');
          if (input) {
            input.value = event.results[0][0].transcript;
            searchWork();
          }
        };
        recognition.start();
      });
    } else {
      voiceBtn.addEventListener('click', function() {
        alert('Voice search is not supported in your browser. Please type your search.');
      });
    }
  }
});

function searchWork() {
  var el = document.getElementById('searchInput');
  var searchTerm = el ? el.value : '';
  if (searchTerm) {
    window.location.href = 'search-results.html?q=' + encodeURIComponent(searchTerm);
  }
}

function searchByCategory(category) {
  window.location.href = 'search-results.html?category=' + encodeURIComponent(category);
}

function viewWorkerProfile(id) {
  window.location.href = 'worker-profile.html?id=' + id;
}

function viewJobDetails(id) {
  window.location.href = 'job-details.html?id=' + id;
}

function saveProfile(event) {
  event.preventDefault();
  var profile = {
    name: (document.getElementById('fullName')||{}).value || '',
    phone: (document.getElementById('phone')||{}).value || '',
    workType: (document.getElementById('workType')||{}).value || '',
    city: (document.getElementById('city')||{}).value || '',
    area: (document.getElementById('area')||{}).value || '',
    wage: (document.getElementById('wage')||{}).value || '',
    experience: (document.getElementById('experience')||{}).value || '',
    availableToday: !!(document.getElementById('availableToday') && document.getElementById('availableToday').checked),
    availableTomorrow: !!(document.getElementById('availableTomorrow') && document.getElementById('availableTomorrow').checked),
    date: new Date().toLocaleString()
  };
  var profiles = JSON.parse(localStorage.getItem('workerProfiles') || '[]');
  profiles.push(profile);
  localStorage.setItem('workerProfiles', JSON.stringify(profiles));
  alert('Profile saved successfully!');
  window.location.href = 'worker-dashboard.html';
}

function saveJob(event) {
  event.preventDefault();
  var job = {
    title: (document.getElementById('jobTitle')||{}).value || '',
    workType: (document.getElementById('workType')||{}).value || '',
    city: (document.getElementById('city')||{}).value || '',
    area: (document.getElementById('area')||{}).value || '',
    when: (document.getElementById('when')||{}).value || '',
    pay: (document.getElementById('pay')||{}).value || '',
    description: (document.getElementById('description')||{}).value || '',
    contactName: (document.getElementById('contactName')||{}).value || '',
    contactPhone: (document.getElementById('contactPhone')||{}).value || '',
    date: new Date().toLocaleString()
  };
  var jobs = JSON.parse(localStorage.getItem('jobPosts') || '[]');
  jobs.push(job);
  localStorage.setItem('jobPosts', JSON.stringify(jobs));
  alert('Job posted successfully!');
  window.location.href = 'index.html';
}
