define({
  "name": "API Reference",
  "version": "0.0.1",
  "description": "",
  "title": "API Reference",
  "sampleUrl": "http://localhost:8080/api/v1/",
  "header": {
    "title": "Reference",
    "content": "<p>This reference describes how to use provided API. Bellow are listed shared conventions.</p>\n<h2>Endpoint and URLs</h2>\n<p>The endpoint address correspond to the base of current URL. To form the complete API URL path use prefix pattern <code>http://$ENDPOINT/$COMPANY/</code>.</p>\n<h2>Schema</h2>\n<p>All exchanged data is in JSON format. HTTP header <code>Content-Type: application/json</code> must be included in requests with body.</p>\n<h2>Authentication</h2>\n<p>Authentication follows <em>OAuth2</em> specification and uses <em>Bearer Token</em>, later referred to as token, to access protected resources. Tokens can be obtained via <a href=\"#api-Access\">Access</a> paths. Expiration is extended by each successful use.</p>\n<h2>Authorized access</h2>\n<p>HTTP header includes <code>Authorization: Bearer &lt;token&gt;</code>.</p>\n<h2>Resources</h2>\n<p>Listed <a href=\"#api-Resource\">Resources</a> state:</p>\n<ul>\n<li>available methods with request paths</li>\n<li>permission if required</li>\n<li>URL parameters and query strings (listed with <code>_</code> prefix)</li>\n<li>example of successful response</li>\n<li>errors</li>\n</ul>\n<h4>Query strings</h4>\n<p>Query strings, listed in parameter tables with <code>_</code> prefix, can be used in following ways:</p>\n<ul>\n<li>get entity fields\n<code>GET $API_PATH/$RESOURCE?getfields</code></li>\n<li>select specified fields\n<code>GET $API_PATH/$RESOURCE?field=$FIELD1&amp;field=FIELD2</code></li>\n<li>filter results\n<code>GET $API_PATH/$RESOURCE?clubid=$ID</code></li>\n</ul>\n<h2>Errors</h2>\n<p>Besides of declared errors, there might be returned <code>{&quot;code&quot;:500,&quot;name&quot;:&quot;InternalError&quot;}</code>.</p>\n"
  },
  "template": {
    "withCompare": false,
    "withGenerator": true
  },
  "template.forceLanguage": "en",
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2017-07-08T13:46:29.587Z",
    "url": "http://apidocjs.com",
    "version": "0.17.5"
  }
});
