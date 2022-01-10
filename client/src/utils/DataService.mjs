import firebase from 'firebase/app'

//const basePath = "http://localhost:8080/"; 
//const basePath = "/portal/";
const basePath = "";

export function getConfig() {
  return new Promise((resolve, reject) => {
    fetch(basePath + 'apim/config', {
      headers: {},        
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    }).catch(error => {
      console.error(error);
      fetch(basePath + 'testdata/config.json')
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  });
}

/**
 * Function to return either real or testdata of API Products
 * @returns {any} Array of API Product objects
 */
export function getApiProducts() {
  return new Promise((resolve, reject) => {
    fetch(basePath + 'apim/apiproducts', {
      headers: {},        
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    }).catch(error => {
      console.error(error);
      fetch(basePath + 'testdata/apiproducts_1.json')
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  });
}

export function getDeveloper(email) {
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
      fetch(basePath + 'apim/developers/' + email, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer ' + idToken
        },        
      })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(error => {
        console.error(error);
        fetch(basePath + 'testdata/developer.json')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  });
}

export function createDeveloper(email, firstName, lastName) {  
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
      fetch(basePath + 'apim/developers/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + idToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          userName: email,
          firstName: firstName,
          lastName: lastName
        })
      })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(error => {
        console.error(error);
        reject(error);
        fetch(basePath + 'testdata/developer.json')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  });
}

/**
 * Description
 * @param {any} email
 * @returns {any}
 */
export function getApps(email) {
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
      fetch(basePath + 'apim/developers/' + email + '/apps', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + idToken
        },        
      })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(error => {
        console.error(error);
        fetch(basePath + 'testdata/apps.json')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  });
}

/**
 * Function to return either real or testdata app
 * @param {any} email The email of the developer
 * @param {any} appName The name of the app
 * @returns {any} Object app definition
 */
export function getApp(email, appName) {
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
      fetch(basePath + 'apim/developers/' + email + '/apps/' + appName, {
        headers: {
          'Authorization': 'Bearer ' + idToken
        },        
      })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(error => {
        console.error(error);
        fetch(basePath + 'testdata/app.json')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  });
}

export function createApp(email, appName, app) {  
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
      fetch(basePath + 'apim/developers/' + email + '/apps/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + idToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(app)
      })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(error => {
        console.error(error);
        fetch(basePath + 'testdata/app.json')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  });
}

export function updateApp(email, appName, app) {  
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
      fetch(basePath + 'apim/developers/' + email + '/apps/' + appName, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + idToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(app)
      })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(error => {
        console.error(error);
        fetch(basePath + 'testdata/app.json')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  });
}

export function deleteApp(email, appName) {  
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
      fetch(basePath + 'apim/developers/' + email + '/apps/' + appName, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + idToken
        }
      })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(error => {
        console.error(error);
        fetch(basePath + 'testdata/app.json')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  });
}

export function updateAppCredential(email, appName, appCredential) {  
  return new Promise((resolve, reject) => {
    firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
      fetch(basePath + 'apim/developers/' + email + '/apps/' + appName + "/keys/" + appCredential.consumerKey, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + idToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appCredential)
      })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch(error => {
        console.error(error);
        fetch(basePath + 'testdata/app.json')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  });
}
