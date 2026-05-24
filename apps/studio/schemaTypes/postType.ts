import {Rule} from 'sanity'

export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: Rule) => rule.required().error('You cannot make a post without a title!'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required().error('Posts are required to have a slug'),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule: Rule) => rule.required().error('"Published at" is required.'),
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      validation: (rule: Rule) =>
        rule
          .max(40)
          .error(
            'A tag cannot be longer than 60 characters, in order to render properly on the frontend.',
          ),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
            {title: 'Code', value: 'code'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (rule: Rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          name: 'inlineImage',
          title: 'Inline Image',
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              validation: (rule: Rule) => rule.required(),
            },
          ],
        },
        {
          name: 'divider',
          title: 'Divider',
          type: 'object',
          fields: [
            {
              name: 'style',
              type: 'string',
              initialValue: 'line',
            },
          ],
          preview: {
            prepare() {
              return {title: '─────────────────'}
            },
          },
        },
      ],
    },
  ],
}
