var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Audio Model
 * ==========
 */

var Audio = new keystone.List('Audio', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Audio.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	}
});

Audio.plural = 'audio'

Audio.relationship({ path: 'audioClip', ref: 'AudioClip', refPath: 'audio' });

Audio.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Audio.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Audio.register();
