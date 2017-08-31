// { groupId, fields }
module.exports = (params) => {
  if (!params.groupId) {
    throw new Error('Group ID is required param');
  }

  if (!params.fields) {
    params.fields = ['id', 'admin_creator', 'application', 'call_to_action', 'caption', 'created_time', 'description', 'feed_targeting', 'from', 'icon', 'instagram_eligibility', 'is_hidden', 'is_instagram_eligible', 'is_published', 'link', 'message', 'message_tags', 'name', 'object_id', 'parent_id', 'permalink_url', 'picture', 'place', 'privacy', 'promotion_status', 'properties', 'shares', 'source', 'status_type', 'story', 'story_tags', 'targeting', 'to', 'type', 'updated_time', 'with_tags'];
  }

  const fbVersion = process.env.FB_GRAPH_VERSION;

  const settings = {
    accessToken: process.env.FB_ACCESS_TOKEN,
    group: {
      id: params.groupId,
      feed: {
        fields: params.fields,
      },
    },
  };

  settings.group.url = `https://graph.facebook.com/${fbVersion}/${settings.group.id}/feed?access_token=${settings.accessToken}&fields=${settings.group.feed.fields}`;

  return settings;
};
