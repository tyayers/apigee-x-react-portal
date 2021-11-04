
/**
 * Function to return either real or testdata of API Products
 * @returns {any} Array of API Product objects
 */
export function getApiProducts() {
  return new Promise((resolve, reject) => {
    fetch('/apim/apiproducts')
    .then(response => response.json())
    .then(data => {
      resolve(data);
    }).catch(error => {
      console.error(error);
      fetch('/testdata/apiproducts.json')
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
 * Description
 * @param {any} email
 * @returns {any}
 */
export function getApps(email) {
  return new Promise((resolve, reject) => {
    fetch('/apim/developers/' + email + '/apps')
    .then(response => response.json())
    .then(data => {
      resolve(data);
    }).catch(error => {
      console.error(error);
      fetch('/testdata/apps.json')
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
 * Function to return either real or testdata app
 * @param {any} email The email of the developer
 * @param {any} appName The name of the app
 * @returns {any} Object app definition
 */
export function getApp(email, appName) {
  return new Promise((resolve, reject) => {
    fetch('/apim/developers/' + email + '/apps/' + appName)
    .then(response => response.json())
    .then(data => {
      resolve(data);
    }).catch(error => {
      console.error(error);
      fetch('/testdata/app.json')
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  });
}

// export function updateAppKeyAddProducts(email, appName, keyName, apiProducts) {  
//   return new Promise((resolve, reject) => {
//     fetch('/apim/developers/' + email + '/apps/' + appName + '/keys/' + keyName, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         apiProducts: apiProducts
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       resolve(data);
//     }).catch(error => {
//       console.error(error);
//       fetch('/testdata/appcredential.json')
//       .then(response => response.json())
//       .then(data => {
//         resolve(data);
//       }).catch((error) => {
//         reject(error);
//       });
//     });
//   });
// }

// export function updateAppKeyRemoveProduct(email, appName, keyName, apiProduct) {  
//   return new Promise((resolve, reject) => {
//     fetch('/apim/developers/' + email + '/apps/' + appName + '/keys/' + keyName + "/apiproducts/" + apiProduct, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       resolve(data);
//     }).catch(error => {
//       console.error(error);
//       fetch('/testdata/appcredential.json')
//       .then(response => response.json())
//       .then(data => {
//         resolve(data);
//       }).catch((error) => {
//         reject(error);
//       });
//     });
//   });
// }

export function updateApp(email, appName, app) {  
  return new Promise((resolve, reject) => {
    fetch('/apim/developers/' + email + '/apps/' + appName, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(app)
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    }).catch(error => {
      console.error(error);
      fetch('/testdata/app.json')
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  });
}

export function updateAppCredential(email, appName, appCredential) {  
  return new Promise((resolve, reject) => {
    fetch('/apim/developers/' + email + '/apps/' + appName + "/keys/" + appCredential.consumerKey, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appCredential)
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    }).catch(error => {
      console.error(error);
      fetch('/testdata/app.json')
      .then(response => response.json())
      .then(data => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  });
}
