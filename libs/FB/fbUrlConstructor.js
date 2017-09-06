module.exports = {
  // FB Graph version
  fbVersion: process.env.FB_GRAPH_VERSION,
  // access token
  accessToken: process.env.FB_ACCESS_TOKEN,

  // { groupId, fields }
  group(params) {
    // fields
    let fields = params.fields;
    if (!params.fields) {
      fields = ['id', 'admin_creator', 'application', 'call_to_action', 'caption', 'created_time', 'description', 'feed_targeting', 'from', 'icon', 'instagram_eligibility', 'is_hidden', 'is_instagram_eligible', 'is_published', 'link', 'message', 'message_tags', 'name', 'object_id', 'parent_id', 'permalink_url', 'picture', 'place', 'privacy', 'promotion_status', 'properties', 'shares', 'source', 'status_type', 'story', 'story_tags', 'targeting', 'to', 'type', 'updated_time', 'with_tags'];
    }
    return `https://graph.facebook.com/${this.fbVersion}/${params.groupId}/feed?access_token=${this.accessToken}&fields=${fields}`;
  },
  // { postId }
  postAttachments(params) {
    return `https://graph.facebook.com/${this.fbVersion}/${params.postId}/attachments?access_token=${this.accessToken}`;
  },
};
