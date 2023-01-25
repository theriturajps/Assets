//<![CDATA[
function getAttr(_2, _3, _4) {
    var _5 = _2.split('$'),
        _6 = /([^{\}]+(?=}))/g;
    for (let _2 = 0; _2 < _5.length; _2++) {
        var _7 = _5[_2].split('=');
        if (_7[0].trim() == _3) {
            return null != (_4 = _7[1]).match(_6) && String(_4.match(_6)).trim()
        }
    };
    return !1
}

function msgError() {
    return '<span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span>'
}

function beforeLoader() {
    return '<div class="loader"></div>'
}

function getFeedUrl(_2, _3, _4, _5) {
    switch (_4) {
    case 'recent':
        _5 = '/feeds/posts/default?alt=json&max-results=' + _3;
        break;
    default:
        _5 = 'info' != _2 ? '/feeds/posts/default/-/' + _4 + '?alt=json&max-results=' + _3 : '/feeds/posts/default/' + _3 + '?alt=json&max-results=1'
    };
    return _5
}

function getPostID(_2, _3, _4) {
    return _4 = (_4 = _2[_3].id.$t) ? _4.split('-').pop() : ''
}

function getPostLink(_2, _3) {
    for (var _4 = 0; _4 < _2[_3].link.length; _4++) {
        if ('alternate' == _2[_3].link[_4].rel) {
            var _5 = _2[_3].link[_4].href;
            break
        }
    };
    return _5
}

function getPostTitle(_2, _3, _4) {
    return _2[_3].title.$t ? _2[_3].title.$t : pbt.noTitle
}

function getFirstImage(_2) {
    var _3 = (_2 = $('<div>').html(_2)).find('img').first().attr('src'),
        _4 = _3.split('/'),
        _5 = '/' + _4.slice(-2)[0];
    return 9 == _4.length && (_5.match(/\/s[0-9]+/g) || _5.match(/\/w[0-9]+/g) || '/d' == _5) && (_3 = _3.replace(_5, '/w72-h72-p-k-no-nu')), _3
}

function getPostImage(_2, _3, _4, _5) {
    var _6 = _2[_3].content ? _2[_3].content.$t : '';
    return _4 = _2[_3].media$thumbnail ? _2[_3].media$thumbnail.url : 'https://resources.blogblog.com/img/blank.gif', _6.indexOf(_6.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) > -1 ? _6.indexOf('<img') > -1 ? _6.indexOf(_6.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) < _6.indexOf('<img') ? _4.replace('img.youtube.com', 'i.ytimg.com').replace('/default.', '/maxresdefault.') : getFirstImage(_6) : _4.replace('img.youtube.com', 'i.ytimg.com').replace('/default.', '/maxresdefault.') : _6.indexOf('<img') > -1 ? getFirstImage(_6) : 'https://resources.blogblog.com/img/blank.gif'
}

function getPostImageType(_2, _3) {
    return _2.match('i.ytimg.com') ? 'is-video' : 'is-image'
}

function getPostInfo(_2, _3, _4, _5) {
    var _6 = '';
    _6 = 'info' == _2 ? _3.content ? _3.content.$t : '' : _3[_4].content ? _3[_4].content.$t : '';
    var _7 = $('<div>').html(_6).find('a:contains("getProduct")').first();
    if (_7.length) {
        _7.replaceText(/([^{\}]+(?=}))/g, '<em>$1</em>'), _7.find('em').replaceText('$', '%s');
        var _10 = _7.text(),
            _8 = getAttr(_10, 'price'),
            _11 = getAttr(_10, 'sale'),
            _9 = getAttr(_10, 'free'),
            _12 = getAttr(_10, 'icon');
        _9 = 0 != _9 ? _9.toLowerCase().trim() : 'no', _12 = 0 != _12 ? _12.toLowerCase().trim() : 'cart', _5 = [_8 = 0 != _8 ? '<span class="entry-price' + ('yes' == _9 ? ' is-free' : '') + '">' + _8.replace('%s', '$') + '</span>' : '', _11 = 0 != _11 && 'yes' != _9 ? '<span class="entry-sale">' + _11.replace('%s', '$') + '</span>' : '', _9]
    } else {
        _5 = !1
    };
    return _5
}

function getPostMeta(_2, _3, _4, _5, _6, _7) {
    return [0 != _2 && '' != _3 ? '<div class="entry-meta product-info">' + _3 + _4 + '</div>' : '', 0 != _2 && '' != _3 ? '<div class="entry-meta product-info">' + _3 + '</div>' : '']
}

function getPostContent(_2, _3, _4, _5) {
    var _6 = '',
        _7 = (_3.length, getPostID(_3, _4)),
        _10 = getPostLink(_3, _4),
        _8 = getPostTitle(_3, _4),
        _11 = getPostImage(_3, _4),
        _9 = getPostImageType(_11, _4),
        _12 = getPostInfo(_2, _3, _4),
        _13 = getPostMeta(_12, _12[0], _12[1]);
    switch (_2) {
    case 'related':
        _4 != _5 - 1 && (_6 += '<div class="related-item pbt-l product item-' + _4 + '" data-id="' + _7 + '"><div class="entry-image-wrap"><a title="' + _8 + '" class="entry-image-link ' + _9 + '" href="' + _10 + '"><span class="entry-image" data-src="' + _11 + '"></span></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + _10 + '" title="' + _8 + '" rel="bookmark">' + _8 + '</a></h2>' + _13[0] + '</div></div>')
    };
    return _6
}

function getRecentPostsData(_2, _3, _4) {
    return $.ajax({
        url: getFeedUrl(_2, _3, 'recent'),
        type: 'GET',
        async: !1,
        dataType: 'json',
        cache: !0,
        success: function (_2) {
            return _2
        }
    }).responseJSON
}

function getPosts(_2, _3, _4, _5, _6) {
    _5 = 0 != _5 ? _5 : 'unlabeled', $.ajax({
        url: getFeedUrl(_3, _4, _5),
        type: 'GET',
        dataType: 'json',
        cache: !0,
        beforeSend: function (_4) {
            switch (_3) {
            case 'product':
                ;
            case 'side':
                ;
            case 'related':
                _2.html(beforeLoader()).parent().addClass('type-' + _3)
            }
        },
        success: function (_7) {
            var _10, _8, _11 = '';
            switch (_3) {
            case 'related':
                _10 = '<div class="related-items products">'
            };
            var _9 = 'info' == _3 ? _7.entry : _7.feed.entry;
            if (_9) {
                switch (_3) {
                case 'info':
                    _11 = getPostMeta(_8 = getPostInfo(_3, _9), _8[0], _8[1]);
                    break;
                default:
                    if ('related' == _3) {
                        1 == _9.length && 'recent' != _5 && (_9 = (_7 = getRecentPostsData(_3, _4)).feed.entry);
                        for (let _2 = 0; _2 < _9.length; _2++) {
                            if (1 != _9.length && getPostID(_9, _2) == _6) {
                                _9.splice(_2, 1);
                                break
                            }
                        }
                    };
                    for (let _2 = 0, _5 = _9; _2 < _5.length; _2++) {
                        _10 += getPostContent(_3, _5, _2, _4)
                    }
                }
            } else {
                _8 = !1, _10 = msgError()
            };
            switch (_3) {
            case 'info':
                0 != _8 ? (_2.find('.entry-header').append('is-side' != _5 ? _11[0] : _11[1]), _2.addClass('ready')) : _2.addClass('error ready');
                break;
            default:
                _10 += '</div>', _2.html(_10), _2.find('span.entry-image').pbtLazy()
            }
        },
        error: function () {
            switch (_3) {
            case 'info':
                _2.addClass('error ready');
                break;
            default:
                _2.html(msgError())
            }
        }
    })
}

function getProductInfo(_2, _3, _4) {
    _3 = _2.data('id'), _4 = !!_2.hasClass('side-item') && 'is-side', null != _3 && getPosts(_2, 'info', _3, _4)
}

function getRelated(_2, _3, _4, _5, _6) {
    'related' == _3 ? getPosts(_2, _3, _4, _5, _6) : _2.html(msgError())
}

function beautiAvatar(_2) {
    $(_2).attr('src', function (_2, _3, _4) {
        return _4 = '//1.bp.blogspot.com/-QN2lgvtYZco/YN3mUSryAVI/AAAAAAAAADs/KrR-etCcvUMcPl06jopTs9pzq59IAXhMQCLcBGAsYHQ/s35/avatar.jpg', _3 = (_3 = (_3 = _3.replace('//resources.blogblog.com/img/blank.gif', _4)).replace('//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35', _4)).replace('/s35', '/s39')
    })
}

function pbtFixedSidebar(_2) {
    $(_2).each(function (_2, _3) {
        1 == pbt.fixedSidebar && (30, _3 = 1 == pbt.fixedMenu ? $('.header-inner').height() + 30 : 30, $(this).theiaStickySidebar({
            containerSelector: '#content-wrapper > .container',
            additionalMarginTop: _3,
            additionalMarginBottom: 30
        }))
    })
}
viewAllText = 'undefined' != typeof viewAllText ? viewAllText : pbt.viewAll, $('#amazen-free-main-menu').pbtMenu().find('.widget').addClass('show-menu'), $('#main-search-wrap').each(function () {
    var _2 = $(this),
        _3 = $(window);
    $('.show-search').click(function () {
        $('body').addClass('search-active'), _2.fadeIn(170).find('input').focus()
    }), $('.search-close').click(function () {
        $('body').removeClass('search-active'), _2.fadeOut(170).find('input').blur().val('')
    }), _3.on('load resize', function (_2, _4) {
        _3.width() > 880 ? (_2 = $('.header-items').outerWidth(), _4 = $('#main-logo').outerWidth(), $('.header-items').attr('style', '--search-width:' + (_2 - (_4 + 14)) + 'px')) : $('.header-items').removeAttr('style')
    })
}), $('.social-toggle').click(function () {
    $('body').toggleClass('social-active')
}), $('.main-title a.title-link, .related-title a.title-link').each(function () {
    '' != viewAllText.trim() && $(this).html(viewAllText)
}), $('.LinkList .social-icons a').each(function (_2) {
    var _3 = $(this),
        _4 = _3.attr('href').split('#'),
        _5 = _3.data('top');
    _4[1] && 1 == _5 && '' != (_2 = _4[1].trim()) && _3.append('<span class="text">' + _2 + '</span>'), _3.attr('href', _4[0].trim())
}), $('.MailChimp .widget-content').each(function (_2, _3) {
    var _4 = $(this),
        _5 = _4.data('shortcode');
    _5 && (_2 = getAttr(_5, 'title'), _3 = getAttr(_5, 'text'), 0 != _2 && _4.find('.mailchimp-title').text(_2), 0 != _3 && _4.find('.mailchimp-text').text(_3))
}), $('.post-body a:contains("getProduct")').first().each(function () {
    var _2 = $(this),
        _3 = getAttr(_2.text(), 'button');
    _2.length && 0 != _3 && (_2.replaceText(/([^{\}]+(?=}))/g, '<em>$1</em>'), _2.find('em').replaceText('$', '%s'), _2.each(function (_2) {
        var _3 = $(this),
            _4 = _3.text(),
            _5 = _3.attr('href'),
            _6 = _3.attr('rel'),
            _7 = _3.attr('target'),
            _10 = getAttr(_4, 'button'),
            _8 = getAttr(_4, 'price'),
            _11 = getAttr(_4, 'sale'),
            _9 = getAttr(_4, 'free'),
            _12 = getAttr(_4, 'icon'),
            _13 = getAttr(_4, 'style');
        _5 = _5 || '#', _6 = _6 ? 'rel="' + _6 + '"' : '', _7 = _7 ? 'target="' + _7 + '"' : '', _9 = 0 != _9 ? _9.toLowerCase().trim() : 'no', _12 = 0 != _12 ? _12.toLowerCase().trim() : 'cart', _13 = 0 != _13 ? _13 : '1', _8 = 0 != _8 ? '<span class="cta-price' + ('yes' == _9 ? ' is-free' : '') + '">' + _8.replace('%s', '$') + '</span>' : '', _11 = 0 != _11 && 'yes' != _9 ? '<span class="cta-sale">' + _11.replace('%s', '$') + '</span>' : '', 0 != (_2 = '' != _8 && '<div class="pbt-cta"><div class="cta-header">' + _8 + _11 + '</div><a class="cta-button btn ' + _12 + '" href="' + _5 + '" ' + _6 + _7 + '>' + _10.replace('%s', '$') + '</a></div>') && ('1' == _13 ? _3.replaceWith(_2) : '2' == _13 ? _3.replaceWith(_2) : _3.replaceWith(''), '1' != _13 && '3' != _13 || $('#sidebar').prepend('<div class="widget ctaWidget">' + _2 + '</div>'))
    }))
}), $('.post-body a:contains("getButton")').each(function () {
    var _2 = $(this);
    0 != getAttr(_2.text(), 'text') && (_2.replaceText(/([^{\}]+(?=}))/g, '<em>$1</em>'), _2.find('em').replaceText('$', '%s'), _2.each(function () {
        var _2 = $(this),
            _3 = _2.text(),
            _4 = getAttr(_3, 'text'),
            _5 = getAttr(_3, 'icon'),
            _6 = getAttr(_3, 'color'),
            _7 = getAttr(_3, 'size'),
            _10 = getAttr(_3, 'info'),
            _8 = _2.parent().attr('style');
        _2.addClass(0 != _7 ? 'button btn x2' : 'button btn').text(_4.replace('%s', '$')), _8 && _8.match('center') && _2.addClass('is-c'), 0 != _10 ? (_2.addClass(0 != _5 ? 'x2 ' + _5 : 'x2'), _2.append('<span class="btn-info">' + _10.replace('%s', '$') + '</span>')) : 0 != _5 && _2.addClass(_5), 0 != _6 && _2.addClass('color').attr('style', 'background-color:' + _6 + ';')
    }))
}), $('.post-body b').each(function () {
    var _2 = $(this),
        _3 = _2.text().toLowerCase().trim();
    _3.match('{contactform}') && (_2.replaceWith('<div class="contact-form-widget"/>'), $('#post-body .contact-form-widget').append($('#ContactForm1 .contact-form-form'))), _3.match('{leftsidebar}') && ($('body').addClass('is-left'), _2.remove()), _3.match('{rightsidebar}') && ($('body').addClass('is-right').removeClass('is-left'), _2.remove()), _3.match('{fullwidth}') && ($('body').addClass('no-sidebar'), _2.remove())
}), $('.post-body blockquote').each(function () {
    var _2 = $(this),
        _3 = _2.text().toLowerCase().trim(),
        _4 = _2.html();
    if (_3.match('{alertsuccess}')) {
        var _5 = _4.replace('{alertSuccess}', '');
        _2.replaceWith('<div class="alert-message alert-success">' + _5 + '</div>')
    };
    if (_3.match('{alertinfo}')) {
        _5 = _4.replace('{alertInfo}', '');
        _2.replaceWith('<div class="alert-message alert-info">' + _5 + '</div>')
    };
    if (_3.match('{alertwarning}')) {
        _5 = _4.replace('{alertWarning}', '');
        _2.replaceWith('<div class="alert-message alert-warning">' + _5 + '</div>')
    };
    if (_3.match('{alerterror}')) {
        _5 = _4.replace('{alertError}', '');
        _2.replaceWith('<div class="alert-message alert-error">' + _5 + '</div>')
    };
    if (_3.match('{codebox}')) {
        _5 = _4.replace('{codeBox}', '');
        _2.replaceWith('<pre class="code-box">' + _5 + '</pre>')
    }
}), $('.share-links .pbt-window').click(function (_2) {
    _2.preventDefault();
    var _3 = $(this),
        _4 = _3.data('url'),
        _5 = _3.data('width'),
        _6 = _3.data('height');
    window.open(_4, '_blank', 'scrollbars=yes,resizable=yes,toolbar=0,width=' + _5 + ',height=' + _6 + ',top=50,left=50').focus()
}), $('.share-links .show-hid a').click(function (_2) {
    _2.preventDefault(), $(this).parent().parent().toggleClass('expanded')
}), $('.about-author .author-text').each(function () {
    var _2 = $(this),
        _3 = _2.find('a');
    _3.length && (_3.each(function () {
        var _2 = $(this),
            _3 = _2.text().trim(),
            _4 = _2.attr('href');
        _2.replaceWith('<li class="' + _3 + '"><a class="fa-' + _3 + '" href="' + _4 + '" title="' + _3 + '" rel="noopener noreferrer" target="_blank"/></li>')
    }), _2.parent().append('<ul class="author-links social sc-a"></ul>'), _2.find('li').appendTo(_2.parent().find('.author-links')))
}), $('.index-posts-wrap .product, .PopularPosts .side-item').each(function () {
    getProductInfo($(this))
}), $('#amazen-free-related-posts .HTML').each(function () {
    var _2 = $(this).data('shortcode');
    if (_2) {
        $('#related-wrap').each(function (_3, _4, _5) {
            var _6 = $(this),
                _7 = _6.find('.related-tag'),
                _10 = $(window),
                _8 = _6.find('.related-content'),
                _11 = getAttr(_2, 'results');
            _6.attr('id');
            _3 = 0 != _11 ? Number(_11) + 1 : 4, _4 = _7.data('label'), _5 = _7.data('id'), _10.on('load resize scroll', function _2() {
                _10.scrollTop() + _10.height() >= _8.offset().top && (_10.off('load resize scroll', _2), getRelated(_8, 'related', _3, _4, _5))
            }).trigger('scroll')
        })
    }
}), $('.amazen-free-blog-post-comments').each(function () {
    var _2 = $(this),
        _3 = getAttr(_2.data('shortcode'), 'type'),
        _4 = _2.find('#top-continue .comment-reply');
    switch (_3) {
    case 'disqus':
        ;
    case 'facebook':
        _2.addClass('comments-system-blogger is-visible'), $('.entry-meta .entry-comments-link').addClass('show'), _4.addClass('btn'), beautiAvatar('.avatar-image-container img');
        break;
    case 'hide':
        _2.addClass('is-hidden');
        break;
    default:
        _2.addClass('comments-system-blogger is-visible'), $('.entry-meta .entry-comments-link').addClass('show'), _4.addClass('btn'), beautiAvatar('.avatar-image-container img')
    };
    var _5 = _2.find('.comments .comment-reply'),
        _6 = _2.find('.comments #top-continue'),
        _7 = _2.find('#top-ce.comment-replybox-thread');
    _5.click(function (_2) {
        _2.preventDefault(), _6.show(), _7.hide()
    }), _6.click(function (_2) {
        _2.preventDefault(), _6.hide(), _7.show()
    })
}), $(function () {
    $('a#prodownload').each(function () {
        var _2 = $(this),
            _3 = 'visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important;font-size:14px!important;color:var(--footerbar-color)!important;margin:0!important;';
        _2.attr('href', 'https://prodownload.in/').text('Pro Download').attr('style', 'visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important;font-size:14px!important;color:var(--main-color)!important;margin:0!important;'), _2.parent().attr('style', _3).parent().attr('style', _3)
    }), setInterval(function () {
        $('a#prodownload').length || (window.location.href = 'https://prodownload.in/'), $('a#prodownload:visible').length || (window.location.href = 'https://prodownload.in/')
    }, 1e3), $('.entry-image-link .entry-image,.author-avatar-wrap .author-avatar').pbtLazy(), $('.mobile-logo').each(function () {
        var _2 = $(this),
            _3 = $('.main-logo a').clone();
        _3.find('h1').remove(), _3.appendTo(_2)
    }), $('#mobile-menu').each(function () {
        var _2 = $(this),
            _3 = $('.main-nav').clone();
        _3.attr('class', 'mobile-nav').attr('id', 'mobile-nav'), _3.find('.has-sub > a').after('<button class="submenu-toggle btn" aria-label="expand"/>'), _3.appendTo(_2), $('.mobile-menu-toggle, .hide-mobile-menu, .overlay').click(function () {
            $('body').toggleClass('nav-active')
        }), $('.mobile-menu .submenu-toggle').click(function () {
            var _2 = $(this);
            _2.parent().hasClass('expanded') ? _2.parent().removeClass('expanded').children('.sub-menu').slideToggle(170) : _2.parent().addClass('expanded').children('.sub-menu').slideToggle(170)
        })
    }), $('.mm-footer').each(function () {
        var _2 = $(this),
            _3 = $('#headerbar .LinkList'),
            _4 = $('#amazen-free-about-section .LinkList'),
            _5 = $('#footer-menu .LinkList'),
            _6 = _3.length ? _3.find('ul.social').clone() : !!_4.length && _4.find('ul.social').clone();
        0 != _6 && (_6.removeClass('sc-a').removeClass('sb-h'), _6.find('.text').remove(), _2.append(_6)), m = !!_5.length && _5.find('ul.link-list').clone(), 0 != m && _2.append(m)
    }), $('.header-inner').each(function () {
        var _2 = $(this);
        if (1 == pbt.fixedMenu && _2.length > 0) {
            var _3 = $(document).scrollTop(),
                _4 = _2.offset().top,
                _5 = _2.height(),
                _6 = _4 + _5 + _5;
            $(window).scroll(function (_5) {
                (_5 = $(document).scrollTop()) > _6 ? _2.addClass('is-fixed') : (_5 < _4 || _5 <= 1) && _2.removeClass('is-fixed'), _5 < _3 ? setTimeout(function () {
                    _2.addClass('show')
                }, 170) : _2.removeClass('show'), _3 = _5
            })
        }
    }), pbtFixedSidebar('#main-wrapper, #sidebar-wrapper'), $('#post-body iframe').each(function () {
        var _2 = $(this);
        _2.attr('src').match('www.youtube.com') && _2.wrap('<div class="youtube-video"/>')
    }), $('p.comment-content').each(function () {
        var _2 = $(this);
        _2.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, '<img src="$1"/>'), _2.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, '<div class="youtube-video"><iframe id="youtube" width="100%" height="358" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')
    }), $('#amazen-free-load-more-link').each(function () {
        var _2 = $(this),
            _3 = _2.data('load');
        _3 && _2.show(), _2.click(function (_4) {
            _4.preventDefault(), _2.hide(), $.ajax({
                url: _3,
                success: function (_4) {
                    var _5 = $(_4).find('.blog-posts');
                    _5.find('.index-post').addClass('fadeInUp'), $('.blog-posts').append(_5.html()), (_3 = $(_4).find('#amazen-free-load-more-link').data('load')) ? _2.show() : (_2.hide(), $('#blog-pager .no-more').addClass('show'))
                },
                beforeSend: function () {
                    $('#blog-pager .loading').show()
                },
                complete: function () {
                    $('#blog-pager .loading').hide(), $('.index-posts-wrap .product').not('.ready').each(function () {
                        getProductInfo($(this))
                    }), $('.index-post .entry-image-link .entry-image').not('.pbt-lazy').pbtLazy(), pbtFixedSidebar('#main-wrapper, #sidebar-wrapper')
                }
            })
        })
    }), $('#back-top').each(function () {
        var _2 = $(this);
        $(window).on('scroll', function () {
            $(this).scrollTop() >= 100 ? _2.addClass('show') : _2.removeClass('show'), _2.offset().top >= $('#footer-wrapper').offset().top - 34 ? _2.addClass('on-footer') : _2.removeClass('on-footer')
        }), _2.click(function (_2) {
            _2.preventDefault(), $('html, body').animate({
                scrollTop: 0
            }, 500)
        })
    })
})
//]]>
