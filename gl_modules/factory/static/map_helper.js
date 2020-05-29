/*THIS FUNCTIONS WERE USED TO PREPARE SVG MAPS FOR STORAGE
* INTO MONGODB, NOT PART OF GLOBTOPUS*/


var countries = {
    "Afghanistan": "af",
    "Albania": "al",
    "Algeria": "dz",
    "American Samoa": "as",
    "Andorra": "ad",
    "Angola": "ao",
    "Anguilla": "ai",
    "Antarctica": "aq",
    "Antigua and Barbuda": "ag",
    "Argentina": "ar",
    "Armenia": "am",
    "Aruba": "aw",
    "Australia": "au",
    "Austria": "at",
    "Azerbaijan": "az",
    "Bahamas (the)": "bs",
    "Bahrain": "bh",
    "Bangladesh": "bd",
    "Barbados": "bb",
    "Belarus": "by",
    "Belgium": "be",
    "Belize": "bz",
    "Benin": "bj",
    "Bermuda": "bm",
    "Bhutan": "bt",
    "Bolivia (Plurinational State of)": "bo",
    "Bonaire, Sint Eustatius and Saba": "bq",
    "Bosnia and Herzegovina": "ba",
    "Botswana": "bw",
    "Bouvet Island": "bv",
    "Brazil": "br",
    "British Indian Ocean Territory (the)": "io",
    "Brunei Darussalam": "bn",
    "Bulgaria": "bg",
    "Burkina Faso": "bf",
    "Burundi": "bi",
    "Cabo Verde": "cv",
    "Cambodia": "kh",
    "Cameroon": "cm",
    "Canada": "ca",
    "Cayman Islands (the)": "ky",
    "Central African Republic (the)": "cf",
    "Chad": "td",
    "Chile": "cl",
    "China": "cn",
    "Christmas Island": "cx",
    "Cocos (Keeling) Islands (the)": "cc",
    "Colombia": "co",
    "Comoros (the)": "km",
    "Congo (the Democratic Republic of the)": "cd",
    "Congo (the)": "cg",
    "Cook Islands (the)": "ck",
    "Costa Rica": "cr",
    "Croatia": "hr",
    "Cuba": "cu",
    "Curaçao": "cw",
    "Cyprus": "cy",
    "Czechia": "cz",
    "Côte d'Ivoire": "ci",
    "Denmark": "dk",
    "Djibouti": "dj",
    "Dominica": "dm",
    "Dominican Republic (the)": "do",
    "Ecuador": "ec",
    "Egypt": "eg",
    "El Salvador": "sv",
    "Equatorial Guinea": "gq",
    "Eritrea": "er",
    "Estonia": "ee",
    "Eswatini": "sz",
    "Ethiopia": "et",
    "Falkland Islands (the) [Malvinas]": "fk",
    "Faroe Islands (the)": "fo",
    "Fiji": "fj",
    "Finland": "fi",
    "France": "fr",
    "French Guiana": "gf",
    "French Polynesia": "pf",
    "French Southern Territories (the)": "tf",
    "Gabon": "ga",
    "Gambia (the)": "gm",
    "Georgia": "ge",
    "Germany": "de",
    "Ghana": "gh",
    "Gibraltar": "gi",
    "Greece": "gr",
    "Greenland": "gl",
    "Grenada": "gd",
    "Guadeloupe": "gp",
    "Guam": "gu",
    "Guatemala": "gt",
    "Guernsey": "gg",
    "Guinea": "gn",
    "Guinea-Bissau": "gw",
    "Guyana": "gy",
    "Haiti": "ht",
    "Heard Island and McDonald Islands": "hm",
    "Holy See (the)": "va",
    "Honduras": "hn",
    "Hong Kong": "hk",
    "Hungary": "hu",
    "Iceland": "is",
    "India": "in",
    "Indonesia": "id",
    "Iran (Islamic Republic of)": "ir",
    "Iraq": "iq",
    "Ireland": "ie",
    "Isle of Man": "im",
    "Israel": "il",
    "Italy": "it",
    "Jamaica": "jm",
    "Japan": "jp",
    "Jersey": "je",
    "Jordan": "jo",
    "Kazakhstan": "kz",
    "Kenya": "ke",
    "Kiribati": "ki",
    "Korea (the Democratic People's Republic of)": "kp",
    "Korea (the Republic of)": "kr",
    "Kuwait": "kw",
    "Kyrgyzstan": "kg",
    "Lao People's Democratic Republic (the)": "la",
    "Latvia": "lv",
    "Lebanon": "lb",
    "Lesotho": "ls",
    "Liberia": "lr",
    "Libya": "ly",
    "Liechtenstein": "li",
    "Lithuania": "lt",
    "Luxembourg": "lu",
    "Macao": "mo",
    "Madagascar": "mg",
    "Malawi": "mw",
    "Malaysia": "my",
    "Maldives": "mv",
    "Mali": "ml",
    "Malta": "mt",
    "Marshall Islands (the)": "mh",
    "Martinique": "mq",
    "Mauritania": "mr",
    "Mauritius": "mu",
    "Mayotte": "yt",
    "Mexico": "mx",
    "Micronesia (Federated States of)": "fm",
    "Moldova (the Republic of)": "md",
    "Monaco": "mc",
    "Mongolia": "mn",
    "Montenegro": "me",
    "Montserrat": "ms",
    "Morocco": "ma",
    "Mozambique": "mz",
    "Myanmar": "mm",
    "Namibia": "na",
    "Nauru": "nr",
    "Nepal": "np",
    "Netherlands (the)": "nl",
    "New Caledonia": "nc",
    "New Zealand": "nz",
    "Nicaragua": "ni",
    "Niger (the)": "ne",
    "Nigeria": "ng",
    "Niue": "nu",
    "Norfolk Island": "nf",
    "Northern Mariana Islands (the)": "mp",
    "Norway": "no",
    "Oman": "om",
    "Pakistan": "pk",
    "Palau": "pw",
    "Palestine, State of": "ps",
    "Panama": "pa",
    "Papua New Guinea": "pg",
    "Paraguay": "py",
    "Peru": "pe",
    "Philippines (the)": "ph",
    "Pitcairn": "pn",
    "Poland": "pl",
    "Portugal": "pt",
    "Puerto Rico": "pr",
    "Qatar": "qa",
    "Republic of North Macedonia": "mk",
    "Romania": "ro",
    "Russian Federation (the)": "ru",
    "Rwanda": "rw",
    "Réunion": "re",
    "Saint Barthélemy": "bl",
    "Saint Helena, Ascension and Tristan da Cunha": "sh",
    "Saint Kitts and Nevis": "kn",
    "Saint Lucia": "lc",
    "Saint Martin (French part)": "mf",
    "Saint Pierre and Miquelon": "pm",
    "Saint Vincent and the Grenadines": "vc",
    "Samoa": "ws",
    "San Marino": "sm",
    "Sao Tome and Principe": "st",
    "Saudi Arabia": "sa",
    "Senegal": "sn",
    "Serbia": "rs",
    "Seychelles": "sc",
    "Sierra Leone": "sl",
    "Singapore": "sg",
    "Sint Maarten (Dutch part)": "sx",
    "Slovakia": "sk",
    "Slovenia": "si",
    "Solomon Islands": "sb",
    "Somalia": "so",
    "South Africa": "za",
    "South Georgia and the South Sandwich Islands": "gs",
    "South Sudan": "ss",
    "Spain": "es",
    "Sri Lanka": "lk",
    "Sudan (the)": "sd",
    "Suriname": "sr",
    "Svalbard and Jan Mayen": "sj",
    "Sweden": "se",
    "Switzerland": "ch",
    "Syrian Arab Republic": "sy",
    "Taiwan (Province of China)": "tw",
    "Tajikistan": "tj",
    "Tanzania, United Republic of": "tz",
    "Thailand": "th",
    "Timor-Leste": "tl",
    "Togo": "tg",
    "Tokelau": "tk",
    "Tonga": "to",
    "Trinidad and Tobago": "tt",
    "Tunisia": "tn",
    "Turkey": "tr",
    "Turkmenistan": "tm",
    "Turks and Caicos Islands (the)": "tc",
    "Tuvalu": "tv",
    "Uganda": "ug",
    "Ukraine": "ua",
    "United Arab Emirates (the)": "ae",
    "United Kingdom of Great Britain and Northern Ireland (the)": "gb",
    "United States Minor Outlying Islands (the)": "um",
    "United States of America (the)": "us",
    "Uruguay": "uy",
    "Uzbekistan": "uz",
    "Vanuatu": "vu",
    "Venezuela (Bolivarian Republic of)": "ve",
    "Viet Nam": "vn",
    "Virgin Islands (British)": "vg",
    "Virgin Islands (U.S.)": "vi",
    "Wallis and Futuna": "wf",
    "Western Sahara": "eh",
    "Yemen": "ye",
    "Zambia": "zm",
    "Zimbabwe": "zw",
    "Åland Islands": "ax",
}
var paths = $('path')
var svg_html = ''
var map = []
var map_for_mongo = ''
 var  no_cc=''

$.each(paths, function (key, value) {

    if(!$(this).attr('id')){
       no_cc+=$(this).attr('id')+',\n'
        //console.log($(this).attr('id'))
    }


    svg_html += `<path `


    /*FOR COUNTRIES ONLY*/
    var county_raw = $(this).attr('id')

    var county = county_raw
        .replace(/\__x7C__/g, '__')
        .replace(/\_1_/g, '')

        .replace(/\_2_/g, '')
        .replace(/\_x5F__x5F_/g, '__')
        .replace(/\_x5F/g, '')
        .replace(/\_x2C__/g, ',')
        .replace(/\_x7c/g, '')
        .replace(/\_x27/g, '&#8217')
        .replace(/\_x29/g, '')
        .replace(/\_x28/g, '')
        .replace(/\_3_/g, '')
        .replace(/\_x200E/g, '')
        .replace(/\__1/g, '')
        .replace(/\_1/g, '')
        .replace(/\_6/g, '')
        .replace(/\_2/g, '')
        .replace(/\_x2F/g, '')
        .replace(/\_3/g, '')
        .replace(/\_4/g, '')
        .replace(/\_x2019/g, '&#8217')
        .replace(/\_x2018_/g, '&#8217')
        .replace(/\_x09/g, '')
        .replace(/\_x2013/g, '')


    svg_html += `id="${county}"`
    map[county] = $(this).attr('d')
    map_for_mongo += `${county}@${$(this).attr('d')}|`



    /*FOR WORLD MAP*/
    // var c_id = $(this).attr('id')
    // var country_code = c_id
    // var c_n_2 = $(this).data("cn2") ? $(this).data("cn2") : ''
    // var d =$(this).attr('d')
    //
    //
    // $.each(countries, function (country, cc) {
    //
    //
    // var cn2 = c_n_2.replace(/\__x7C__/g, '__')
    //     .replace(/\_1_/g, '')
    //
    //     .replace(/\_2_/g, '')
    //     .replace(/\_x5F__x5F_/g, '__')
    //     .replace(/\_x5F/g, '')
    //     .replace(/\_x2C__/g, ',')
    //     .replace(/\_x7c/g, '')
    //     .replace(/\_x27/g, '&#8217')
    //     .replace(/\_x29/g, '')
    //     .replace(/\_x28/g, '')
    //     .replace(/\_3_/g, '')
    //     .replace(/\_x200E/g, '')
    //     .replace(/\__1/g, '')
    //     .replace(/\_1/g, '')
    //     .replace(/\_6/g, '')
    //     .replace(/\_2/g, '')
    //     .replace(/\_x2F/g, '')
    //     .replace(/\_3/g, '')
    //     .replace(/\_4/g, '')
    //     .replace(/\_x2019/g, '&#8217')
    //     .replace(/\_x2018_/g, '&#8217')
    //     .replace(/\_x09/g, '')
    //     .replace(/\_x2013/g, '')





        // if (country_code === cc) {
        //     // svg_html += `id="${c_id}" data-cn="${country}"
        //     // ${country !== cn2.replace(/\_/g, ' ')  && cn2 !== '' ? `data-cn2="${cn2}"`:""}  `
        // var country_2 = (country !== cn2.replace(/\_/g, ' ')  && cn2 !== '') ? cn2:""
        // map_for_mongo += `${c_id}@${d}***${country}***${country_2}==`
        //
        //
        // }



    // })

    // if($(this).attr('cc')[0] !== '"')
    // {
    //     svg_html+=`data-cc= "${cc}"`
    // }
    // else
    // {
    //
    // }


    // svg_html += `
    //   fill="${$(this).attr('fill')}"
    //   stroke="${$(this).attr('stroke')}"
    //   stroke-width ="${$(this).attr('stroke-width')}"
    //   ${$(this).attr('stroke-miterlimit') ? 'stroke-miterlimit ="' + $(this).attr('stroke-miterlimit') + '"' : ""}
    //   d="${$(this).attr('d')}" />
    //  `

})


/*FOR COUNTRIES*/
Swal.fire({

    html: ` <button class="bg-info text-light" id="send_to_db">send to db</button>
        <input type="text" id="country_code">`,
    showConfirmButton: false
})
// console.log(no_cc)
// console.log(map_for_mongo)

$('#send_to_db').on('click', function () {
    var cc = $('#country_code').val()
    $.getJSON('/store_map', {
            c_map: (map_for_mongo),
            cc: cc,
            for: cc ==='world'? 'world' :  'country'
        },
        function (response) {
            if (response.text === 'inserted') {
                // swal.fire({
                //     html:`<h4>inserted</h4>`
                // })


                $.getJSON('/load_map',
                    {
                        cc: cc,
                        for: cc ==='world'? 'world' :  'country'
                    },
                    function (Svg) {
                        var c_c = Svg.c_c

                        var new_map = ` <svg xmlns="http://www.w3.org/2000/svg" id="country_map" x="0" y="0" baseProfile="tiny" viewBox="0 0 660 447" xml:space="preserve">`

                        var locations = ''

                        $.each(Svg.c_map, function (index, map_) {
                            console.log(   Svg.c_map[index])
                            /*var location = Svg.svg_map[index].cc  for world */
                            //var location = Svg.c_map[index].cc
                            var location = Object.keys(map_)[0]
                            var d = map_[location]

                            locations += `${location} <br>`
                            /*for world we will append cc, name and name2 ( name in 2 languages )
                            * for country only name to id attribute*/

                            /*for country */
                            new_map += `<path id="${location}" fill="#006400" stroke="#eee" stroke-width=".25" d="${d}"/>`

                            /*for world*/
                            // new_map += `<path id="${Svg.c_map[index].cc}"
                            //                   data-cn="${Svg.c_map[index].cn}"
                            //                   data-cn2="${Svg.c_map[index].cn2}"
                            //                   fill="#006400" stroke="#eee" stroke-width=".25" d="${Svg.c_map[index].d}"/>`


                        })
                        new_map += `</svg><div id="current" class="bg-info text-light mb-3"></div>`

                        swal.fire({
                            title: 'Map from db and cc: ' + c_c,

                            html: new_map + locations,
                            position: 'top-end'
                        })
                        $('path').on('mouseenter',
                            function () {

                                current_fill = $(this).attr('fill')
                                $(this).attr('fill', "rgba(111, 227, 0, 0.3)")
                                $('#current').html(   $(this).data('cn2') !== "" ? $(this).data('cn2') :  $(this).data('cn')  )
                            })
                            .on('mouseleave',
                                function () {
                                    $(this).attr('fill', current_fill)


                                }
                            )

                    })
            }
        })
})


