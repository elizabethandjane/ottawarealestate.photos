module Jekyll
  class AutoGalleryTag < Liquid::Tag

    def initialize(tag_name, raw_params, tokens)
      super
      @raw_params = raw_params
      @params = raw_params.split(" ")
      @url = @params[0].strip
      @realtor = @params[1].strip
      @prop = @params[2].strip
      @group = @params[3].strip
      @count = @params[4].strip
    end

    def get_image_groups(context)
      group = context[@group]
      count = context[@count]
      if not count or count <= 0
        return []
      end
      files = []
      for i in 1..count do
        files.push("#{group}-#{'%02d'%i}")
      end
      groups = []
      while files.length > 0 do
        groups.push(files.slice!(0..[1, 2, 3].sample))
      end
      if groups[-1].length == 1
        if groups[-2].length == 4
          groups[-1].push(groups[-2].slice!(-1))
        else
          groups[-2].push(groups[-1].slice!(0))
          groups.delete_at(-1)
        end
      end
      groups
    end

    def render(context)
      groups = get_image_groups(context)
      tags = []
      for group in groups
        tags.push('<div class="gallery-row gallery-row-%d">' % group.length)
        for img in group
          tags.push('<div><div class="embed embed-3by2">')
          tags.push('<img class="embed-item" src="%s/properties/%s/%s/%s.jpg" loading="lazy" decoding="async" alt="">' % [context[@url], context[@realtor], context[@prop], img])
          tags.push('</div></div>')
        end
        tags.push('</div>')
      end
      tags.join
    end
  end
end

Liquid::Template.register_tag('auto_gallery', Jekyll::AutoGalleryTag)
