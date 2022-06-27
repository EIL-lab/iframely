import * as oembedUtils from '../../lib/plugins/system/oembed/oembedUtils.js';

export default {

    getData: function(url, meta, __noOembedLinks, options, cb) {

        var oembedLinks = oembedUtils.findOembedLinks(null, meta);
        var iframelyTargeted = Object.keys(meta).some(key => key.indexOf('iframely') === 0);

        return cb(
            meta.robots
            && /noindex/i.test(meta.robots)
            && !meta.description
            && !meta.og
            && !meta.twitter
            && !oembedLinks // null if length == 0.
            && !iframelyTargeted
            && !options.allowNoIndex
            ? {
               responseStatusCode: 403,
               message: "The robots directive of this page prevents Iframely from parsing it"
            } : null);
    }

};