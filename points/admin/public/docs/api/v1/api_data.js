define({ "api": [
  {
    "type": "delete",
    "url": "/",
    "title": "Remove",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "group": "User",
    "description": "<p>Delete the authorized user</p>",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../user/index.js",
    "groupTitle": "User",
    "name": "Delete",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1//"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Get",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "group": "User",
    "description": "<p>Get info about authorized user</p>",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"admin\",\n  \"email\": \"admin@mail.com\",\n  \"phone\": \"+420-241-142-124\",\n  \"firstName\": \"Mr. Admin\",\n  \"lastName\": \"Adminuv\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../user/index.js",
    "groupTitle": "User",
    "name": "GetUser",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1//user"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": ""
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/updateInfo",
    "title": "Update user info",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "group": "User",
    "description": "<p>Update info of authorized user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>display name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"admin\",\n  \"email\": \"admin@mail.com\",\n  \"phone\": \"+420-241-142-124\",\n  \"firstName\": \"Mr. Admin\",\n  \"lastName\": \"Adminuv\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../user/index.js",
    "groupTitle": "User",
    "name": "PostUpdateinfo",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1//updateInfo"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": ""
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/user/signIn",
    "title": "SignIn",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "group": "User",
    "description": "<p>User authorization</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"tokenType\": \"Bearer\",\n  \"accessToken\": \"b3f2dacb-d0d9-4b11-9fd4-475f4cd9f8df\",\n  \"expires\": \"2017-07-11T13:00:22.611Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../user/index.js",
    "groupTitle": "User",
    "name": "PostUserSignin",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1//user/signIn"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/signUp",
    "title": "SignUp",
    "description": "<p>New user registration</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>display name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"tokenType\": \"Bearer\",\n  \"accessToken\": \"b3f2dacb-d0d9-4b11-9fd4-475f4cd9f8df\",\n  \"expires\": \"2017-07-11T13:00:22.611Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../user/index.js",
    "groupTitle": "User",
    "name": "PostUserSignup",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1//user/signUp"
      }
    ]
  }
] });
