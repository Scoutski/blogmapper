Blog.create!([
  {name: "Excuse Me Waiter", blog_url: "http://www.excusemewaiter.com/", marker_url: "https://instagramimages-a.akamaihd.net/profiles/profile_191233046_75sq_1341645354.jpg"},
  {name: "Not Quite Nigella", blog_url: "http://www.notquitenigella.com/", marker_url: "http://static.notquitenigella.com/assets-1f88335/macaron.jpg"},
  {name: "Chocolate Suze", blog_url: "http://www.chocolatesuze.com/", marker_url: "http://www.chocolatesuze.com/images10/icon-comment.gif"},
  {name: "Hotly Spiced", blog_url: "http://hotlyspiced.com/", marker_url: "http://cdn.mysitemyway.com/icons-watermarks/simple-black/bfa/bfa_h-square/bfa_h-square_simple-black_128x128.png"},
  {name: "Grab Your Fork", blog_url: "http://grabyourfork.blogspot.com", marker_url: "http://www.recavellaneda.com.ar/images/icon-gastronomia.png"}
])
Post.create!([
  {name: "The Choc Pot, Chatswood", published: "2015-05-28", post_url: "http://www.excusemewaiter.com/2015/05/28/the-choc-pot-chatswood/", restaurant_name: "The Choc Pot", restaurant_loc: "7/1 Railway Parade Burwood NSW 2134 Australia", blog_id: 1, latitude: "-33.8769916", longitude: "151.1013139"},
  {name: "Rengaya, North Sydney", published: "2015-06-01", post_url: "http://www.excusemewaiter.com/2015/06/01/rengaya-north-sydney/", restaurant_name: "Yakiniku Rengaya Japanese", restaurant_loc: "73 Miller St North Sydney NSW 2060", blog_id: 1, latitude: "-33.8405932", longitude: "151.2066836"},
  {name: "Sushi Train, Neutral Bay", published: "2015-05-26", post_url: "http://www.excusemewaiter.com/2015/05/26/sushi-train-neutral-bay/", restaurant_name: "Sushi Train Neutral Bay", restaurant_loc: "308 Military Rd, Cremorne NSW 2090", blog_id: 1, latitude: "-33.829639", longitude: "151.22719"},
  {name: "Camden Villa Cafe, Newtown", published: "2015-06-02", post_url: "http://www.notquitenigella.com/2015/06/02/camden-villa-cafe-newtown/", restaurant_name: "Camden Villa Cafe", restaurant_loc: "415 King Street Newtown NSW 2042", blog_id: 2, latitude: "-33.900453", longitude: "151.177894"},
  {name: "Pinbone, Woollahra", published: "2015-06-01", post_url: "http://www.chocolatesuze.com/2015/06/01/pinbone-woollahra", restaurant_name: "Pinbone", restaurant_loc: "3 Jersey Rd, Woollahra NSW", blog_id: 3, latitude: "-33.888553", longitude: "151.232586"},
  {name: "Buffalo Dining Club, Darlinghurst", published: "2015-05-25", post_url: "http://www.chocolatesuze.com/2015/05/25/buffalo-dining-club-darlinghurst", restaurant_name: "Buffalo Dining Club", restaurant_loc: "116 Surrey St, Darlinghurst NSW", blog_id: 3, latitude: "-33.877675", longitude: "151.221986"},
  {name: "Tartine, Mascot", published: "2015-05-18", post_url: "http://www.chocolatesuze.com/2015/05/18/tartine-mascot", restaurant_name: "Tartine", restaurant_loc: "635 Gardeners Road, Mascot NSW", blog_id: 3, latitude: "-33.9206979", longitude: "151.1891793"},
  {name: "Chiswick, Woollahra", published: "2015-06-02", post_url: "http://hotlyspiced.com/chiswick-woollahra/", restaurant_name: "Chiswick", restaurant_loc: "65 Ocean Street, Woollahra NSW 2025", blog_id: 4, latitude: "-33.8860163", longitude: "151.2399132"},
  {name: "The Fitzroy Inn, Mittagong", published: "2015-05-26", post_url: "http://hotlyspiced.com/the-fitzroy-inn-mittagong/", restaurant_name: "The Fitzroy Inn", restaurant_loc: "1 Ferguson Street, Mittagong NSW 2575", blog_id: 4, latitude: "-34.446081", longitude: "150.461359"},
  {name: "Din Tai Fung, World Square", published: "2015-05-18", post_url: "http://hotlyspiced.com/din-tai-fung-world-square/", restaurant_name: "Din Tai Fung", restaurant_loc: "World Square, Level 1, 644 George Street, Sydney", blog_id: 4, latitude: "-33.87652380000001", longitude: "151.2061858"},
  {name: "Playa Takeria, Darlinghurst", published: "2015-03-16", post_url: "http://hotlyspiced.com/playa-takeria-darlinghurst/", restaurant_name: "Playa Takeria", restaurant_loc: "132 Darlinghurst Road, Darlinghurst, Sydney 2010", blog_id: 4, latitude: "-33.8784379", longitude: "151.2204887"},
  {name: "Peranakan Place, Auburn", published: "2015-05-17", post_url: "http://grabyourfork.blogspot.com/2015/05/peranakan-place-auburn.html", restaurant_name: "Peranakan Place", restaurant_loc: "139 Parramatta Road, Auburn, Sydney", blog_id: 5, latitude: "-33.84294800000001", longitude: "151.039541"},
  {name: "Crispy Cluckers, Newington", published: "2015-05-10", post_url: "http://grabyourfork.blogspot.com/2015/05/crispy-cluckers-newington.html", restaurant_name: "Crispy Cluckers", restaurant_loc: "Shop C03/3 Avenue of Europe, Newington, Sydney", blog_id: 5, latitude: "-33.83367399999999", longitude: "151.056347"}
])
User.create!([
  {name: "Jess", password_digest: "$2a$10$LFqJJbzE8qx5IGM72Hx3Gu./3BPoJtkyHZvMH8NT3KWmS0Y48Fx3O", admin: false, fav_posts: [], fav_blogs: []},
  {name: "test", password_digest: "$2a$10$zif4Qjm.5TaJFtO/LTKo7uxQjQ6dmf/EuluIA7imatlOsPfmx5zpG", admin: false, fav_posts: [], fav_blogs: []},
  {name: "Mike", password_digest: "$2a$10$6MCK1Ebk1lkG2kTuDW5XG.WIo4d0t.7jkPVoXS6q8nx44Ui61p1rq", admin: true, fav_posts: [8, 7, 2, 9, 3, 15, 6, 10], fav_blogs: [2, 3, 1]},
  {name: "Alan", password_digest: "$2a$10$0TxERzp/4FL8BW1GNmCo4u6jzIQ/5p5K8xilVpCZJedtpI5z7OLFG", admin: false, fav_posts: [10, 7, 3], fav_blogs: []}
])
