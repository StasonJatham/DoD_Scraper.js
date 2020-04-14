// Search -> KEYWORD
// https://www.defense.gov/Newsroom/Contracts/Search/KEYWORD/
// -------
// Example:
// https://www.defense.gov/Newsroom/Contracts/Search/Boeing/
// ------------------------------------------------------------

// All Contracts -> PAGE (momentan bis 136)
// https://www.defense.gov/Newsroom/Contracts/?Page=PAGE
// -------
// Example:
// https://www.defense.gov/Newsroom/Contracts/?Page=1
// https://www.defense.gov/Newsroom/Contracts/?Page=136
// -------------------------------------------------------

// Contract -> DATE
// https://www.defense.gov/Newsroom/Contracts/Contract/Article/DATE
// -------
// https://www.defense.gov/Newsroom/Contracts/Contract/Article/2041268/
// ---------------------------------------------------------------------

// Select Text from Article Page
// document.querySelector(".body")

// get current link
// window.location.href





// ---> Save Company with money for each day in db

// https://www.defense.gov/Newsroom/Contracts/Contract/Article/1954307/
var COMPANY_NAME = "The Boeing Co.";
var comp_money = 0;
var interesting_div = document.querySelector('.body')
var all_contracts = interesting_div.querySelectorAll("p"),i;
var text_or_heading;
var heading;
var text;
var name_regex = /^([^,]+)/gm;
var price_regex = /\$([0-9]{1,3},*)+/gm;
var price_contract_regex =/\$([0-9]{1,3},*)+ (?<=)([^\s]+)/gm;
var company_name;
var company_article;

for (i = 0; i < all_contracts.length; ++i) {
  text_or_heading = all_contracts[i];

  if (text_or_heading.getAttribute('id') != "skip-target-holder") {
  	if (text_or_heading.getAttribute('style')) {
  		heading = text_or_heading.innerText;
  	} else {
  		text = text_or_heading.innerText;
	    company_name = text.match(name_regex)
	    contract_price = text.match(price_regex)
	    contract_type = text.match(price_contract_regex)

	    try {
	    	contract_type = contract_type[0];
	    	clean_type = contract_type.split(' ');
	    	contract_type = clean_type[1];
	    } catch(e) {
	    	contract_type = "null";
	    }
	    try {
	    	company_article = company_name[0];
	    } catch(e) {
	    	company_article = "null";
	    }
	    try {
	    	contract_amount = contract_price[0];
		    if (company_article == COMPANY_NAME){
		    	contract_amount = contract_amount.replace("$","")
		    	contract_amount = contract_amount.replace(",","")
		    	contract_amount = contract_amount.replace(",","")
		    	contract_amount = contract_amount.replace(",","")
		    	contract_amount = parseInt(contract_amount, 10)


		    	comp_money = contract_amount + comp_money
	    	}
	    } catch(e) {
	    	contract_amount = "$0";
	    }

	    console.log("Heading      : " + heading);
	    console.log("Text         : " + text);
	    console.log("Company Name : " + company_article);
	    console.log("Awarded      : " + contract_amount)
	    console.log("Contract Type: " + contract_type);
  	}
  }
}
console.log(COMPANY_NAME);
console.log(new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(comp_money));



// --> Save all Links to Table in Database
for (var i = 1; i >= 136; i++) {
	var url = "https://www.defense.gov/Newsroom/Contracts/?Page=" + i

	var  page_links = document.querySelector("#alist > div.alist-inner.alist-more-here")
	var all_links   = page_links.querySelectorAll("a.title")

	all_links.forEach(page_link => {
		var contract_date = Date(Date.parse(page_link.innerText))
		var contracvt_link = page_link.href
	});
}




// Tables:

// Links
// Day
// Companies
// Day - Company - Money - Link
