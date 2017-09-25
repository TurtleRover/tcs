/*
 * jquery-flagstrap.js from https://github.com/blazeworx/flagstrap
 * 
 * Modified to work in combination with jquery-ui SelectMenu.
 * 
 * Michael Wolf <michael@mictronics.de> 2017
 * 
 */

(function ($) {
    var countries = {
        "AF": "Afghanistan",
        "AL": "Albania",
        "DZ": "Algeria",
        "AS": "American Samoa",
        "AD": "Andorra",
        "AO": "Angola",
        "AI": "Anguilla",
        "AG": "Antigua and Barbuda",
        "AR": "Argentina",
        "AM": "Armenia",
        "AW": "Aruba",
        "AU": "Australia",
        "AT": "Austria",
        "AZ": "Azerbaijan",
        "BS": "Bahamas",
        "BH": "Bahrain",
        "BD": "Bangladesh",
        "BB": "Barbados",
        "BY": "Belarus",
        "BE": "Belgium",
        "BZ": "Belize",
        "BJ": "Benin",
        "BM": "Bermuda",
        "BT": "Bhutan",
        "BO": "Bolivia, Plurinational State of",
        "BA": "Bosnia and Herzegovina",
        "BW": "Botswana",
        "BV": "Bouvet Island",
        "BR": "Brazil",
        "IO": "British Indian Ocean Territory",
        "BN": "Brunei Darussalam",
        "BG": "Bulgaria",
        "BF": "Burkina Faso",
        "BI": "Burundi",
        "KH": "Cambodia",
        "CM": "Cameroon",
        "CA": "Canada",
        "CV": "Cape Verde",
        "KY": "Cayman Islands",
        "CF": "Central African Republic",
        "TD": "Chad",
        "CL": "Chile",
        "CN": "China",
        "CO": "Colombia",
        "KM": "Comoros",
        "CG": "Congo",
        "CD": "Congo, the Democratic Republic of the",
        "CK": "Cook Islands",
        "CR": "Costa Rica",
        "CI": "CÃ´te d'Ivoire",
        "HR": "Croatia",
        "CU": "Cuba",
        "CW": "CuraÃ§ao",
        "CY": "Cyprus",
        "CZ": "Czech Republic",
        "DK": "Denmark",
        "DJ": "Djibouti",
        "DM": "Dominica",
        "DO": "Dominican Republic",
        "EC": "Ecuador",
        "EG": "Egypt",
        "SV": "El Salvador",
        "GQ": "Equatorial Guinea",
        "ER": "Eritrea",
        "EE": "Estonia",
        "ET": "Ethiopia",
        "FK": "Falkland Islands (Malvinas)",
        "FO": "Faroe Islands",
        "FJ": "Fiji",
        "FI": "Finland",
        "FR": "France",
        "GF": "French Guiana",
        "PF": "French Polynesia",
        "TF": "French Southern Territories",
        "GA": "Gabon",
        "GM": "Gambia",
        "GE": "Georgia",
        "DE": "Germany",
        "GH": "Ghana",
        "GI": "Gibraltar",
        "GR": "Greece",
        "GL": "Greenland",
        "GD": "Grenada",
        "GP": "Guadeloupe",
        "GU": "Guam",
        "GT": "Guatemala",
        "GG": "Guernsey",
        "GN": "Guinea",
        "GW": "Guinea-Bissau",
        "GY": "Guyana",
        "HT": "Haiti",
        "HM": "Heard Island and McDonald Islands",
        "VA": "Holy See (Vatican City State)",
        "HN": "Honduras",
        "HK": "Hong Kong",
        "HU": "Hungary",
        "IS": "Iceland",
        "IN": "India",
        "ID": "Indonesia",
        "IR": "Iran, Islamic Republic of",
        "IQ": "Iraq",
        "IE": "Ireland",
        "IM": "Isle of Man",
        "IL": "Israel",
        "IT": "Italy",
        "JM": "Jamaica",
        "JP": "Japan",
        "JE": "Jersey",
        "JO": "Jordan",
        "KZ": "Kazakhstan",
        "KE": "Kenya",
        "KI": "Kiribati",
        "KP": "Korea, Democratic People's Republic of",
        "KR": "Korea, Republic of",
        "KW": "Kuwait",
        "KG": "Kyrgyzstan",
        "LA": "Lao People's Democratic Republic",
        "LV": "Latvia",
        "LB": "Lebanon",
        "LS": "Lesotho",
        "LR": "Liberia",
        "LY": "Libya",
        "LI": "Liechtenstein",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "MO": "Macao",
        "MK": "Macedonia, the former Yugoslav Republic of",
        "MG": "Madagascar",
        "MW": "Malawi",
        "MY": "Malaysia",
        "MV": "Maldives",
        "ML": "Mali",
        "MT": "Malta",
        "MH": "Marshall Islands",
        "MQ": "Martinique",
        "MR": "Mauritania",
        "MU": "Mauritius",
        "YT": "Mayotte",
        "MX": "Mexico",
        "FM": "Micronesia, Federated States of",
        "MD": "Moldova, Republic of",
        "MC": "Monaco",
        "MN": "Mongolia",
        "ME": "Montenegro",
        "MS": "Montserrat",
        "MA": "Morocco",
        "MZ": "Mozambique",
        "MM": "Myanmar",
        "NA": "Namibia",
        "NR": "Nauru",
        "NP": "Nepal",
        "NL": "Netherlands",
        "NC": "New Caledonia",
        "NZ": "New Zealand",
        "NI": "Nicaragua",
        "NE": "Niger",
        "NG": "Nigeria",
        "NU": "Niue",
        "NF": "Norfolk Island",
        "MP": "Northern Mariana Islands",
        "NO": "Norway",
        "OM": "Oman",
        "PK": "Pakistan",
        "PW": "Palau",
        "PS": "Palestinian Territory, Occupied",
        "PA": "Panama",
        "PG": "Papua New Guinea",
        "PY": "Paraguay",
        "PE": "Peru",
        "PH": "Philippines",
        "PN": "Pitcairn",
        "PL": "Poland",
        "PT": "Portugal",
        "PR": "Puerto Rico",
        "QA": "Qatar",
        "RE": "RÃ©union",
        "RO": "Romania",
        "RU": "Russian Federation",
        "RW": "Rwanda",
        "SH": "Saint Helena, Ascension and Tristan da Cunha",
        "KN": "Saint Kitts and Nevis",
        "LC": "Saint Lucia",
        "MF": "Saint Martin (French part)",
        "PM": "Saint Pierre and Miquelon",
        "VC": "Saint Vincent and the Grenadines",
        "WS": "Samoa",
        "SM": "San Marino",
        "ST": "Sao Tome and Principe",
        "SA": "Saudi Arabia",
        "SN": "Senegal",
        "RS": "Serbia",
        "SC": "Seychelles",
        "SL": "Sierra Leone",
        "SG": "Singapore",
        "SX": "Sint Maarten (Dutch part)",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "SB": "Solomon Islands",
        "SO": "Somalia",
        "ZA": "South Africa",
        "GS": "South Georgia and the South Sandwich Islands",
        "SS": "South Sudan",
        "ES": "Spain",
        "LK": "Sri Lanka",
        "SD": "Sudan",
        "SR": "Suriname",
        "SZ": "Swaziland",
        "SE": "Sweden",
        "CH": "Switzerland",
        "SY": "Syrian Arab Republic",
        "TW": "Taiwan, Province of China",
        "TJ": "Tajikistan",
        "TZ": "Tanzania, United Republic of",
        "TH": "Thailand",
        "TL": "Timor-Leste",
        "TG": "Togo",
        "TK": "Tokelau",
        "TO": "Tonga",
        "TT": "Trinidad and Tobago",
        "TN": "Tunisia",
        "TR": "Turkey",
        "TM": "Turkmenistan",
        "TC": "Turks and Caicos Islands",
        "TV": "Tuvalu",
        "UG": "Uganda",
        "UA": "Ukraine",
        "AE": "United Arab Emirates",
        "GB": "United Kingdom",
        "US": "United States",
        "UM": "United States Minor Outlying Islands",
        "UY": "Uruguay",
        "UZ": "Uzbekistan",
        "VU": "Vanuatu",
        "VE": "Venezuela, Bolivarian Republic of",
        "VN": "Viet Nam",
        "VG": "Virgin Islands, British",
        "VI": "Virgin Islands, U.S.",
        "WF": "Wallis and Futuna",
        "EH": "Western Sahara",
        "YE": "Yemen",
        "ZM": "Zambia",
        "ZW": "Zimbabwe"
    };
    $.flagStrap = function (element, options, i) {

        var plugin = this;

        var uniqueId = generateId(8);

        plugin.countries = {};
        plugin.selected = {value: null, text: null};
        plugin.settings = {inputName: 'country-' + uniqueId};

        var $container = $(element);
        var htmlSelectId = 'flagstrap' + uniqueId;
        var htmlSelect = '#' + htmlSelectId;

        plugin.init = function () {

            // Merge in global settings then merge in individual settings via data attributes
            plugin.countries = countries;

            // Initialize Settings, priority: defaults, init options, data attributes
            plugin.countries = countries;
            plugin.settings = $.extend({}, options, $container.data());

            if (undefined !== plugin.settings.countries) {
                plugin.countries = plugin.settings.countries;
            }

            if (undefined !== plugin.settings.inputId) {
                htmlSelectId = plugin.settings.inputId;
                htmlSelect = '#' + htmlSelectId;
            }

            // Build HTML Select, Construct the drop down button, Assemble the drop down list items element and insert
            $container
                .addClass('flagstrap')
                .append(buildHtmlSelect);

            // Hide the actual HTML select
            $(htmlSelect).hide();

        };
        // Build selection list for dropdown
        var buildHtmlSelect = function () {
            var htmlSelectElement = $('<select/>').attr('id', htmlSelectId).attr('name', plugin.settings.inputName);

            $.each(plugin.countries, function (code, country) {
                var optionAttributes = {value: code};
                if (plugin.settings.selectedCountry !== undefined) {
                    if (plugin.settings.selectedCountry === code) {
                        optionAttributes = {value: code, selected: "selected"};
                        plugin.selected = {value: code, text: country}
                    }
                }
                htmlSelectElement.append($('<option>', optionAttributes).text(country));
            });

            return htmlSelectElement;
        };

        function generateId(length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

            if (!length) {
                length = Math.floor(Math.random() * chars.length);
            }

            var str = '';
            for (var i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        }

        plugin.init();
        
        // Initialize dropdown
        $(htmlSelect).selectmenu();
        var widgetInstance = $(htmlSelect).selectmenu('instance');
        // Render dropdown with country flags
        widgetInstance._renderItem = function( ul, item ) {
            var li = $( "<li>" ),
            wrapper = $( "<div>", { text: item.label } );
            wrapper.addClass("flagstrap-icon-wrapper");
            
            $( "<span>", {
                style: item.element.attr( "data-style" ),
                "class": "flagstrap-icon flagstrap-" + item.value.toLowerCase()
            }).appendTo( wrapper );
            return li.append( wrapper ).appendTo( ul );
        };
        
        // Render button with selected country flag
        widgetInstance._renderButtonItem = function( item ) {
            var buttonItem = $( "<span>", {
                "class": "ui-selectmenu-text flagstrap-icon-wrapper"
            });
            this._setText( buttonItem, item.label );
 
            buttonItem.prepend($( "<span>", {
                "class": "flagstrap-icon flagstrap-" + item.value.toLowerCase()
            }));           
 
            return buttonItem;
        };
        
        widgetInstance.refresh();
    };

    $.fn.flagStrap = function (options) {
        return this.each(function (i) {
            if ($(this).data('flagStrap') === undefined) {
                $(this).data('flagStrap', new $.flagStrap(this, options, i));
            }
        });
    };
})(jQuery);