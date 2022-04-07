import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";

const allCongressMemebers = [...senators, ...representatives]; // modern way to combine arrays

// const allSenatorButton = document.createElement('button')
// allSenatorButton.textContent = 'All Senators'
// allSenatorButton.addEventListener('click', function () {
//   populateDOM(people)
// })

// const maleSenators = people.filter(person => person.gender === 'M')

const senatorDiv = document.querySelector(".senatorDiv");
const seniorityHeading = document.querySelector(".seniorty");
const loyaltyList = document.querySelector(".loyaltyList");


function simplifiedSenators() {
  return senators.map((senator) => {
    const middleName = senator.middle_name ? ` ${senator.middle_name}` : ` `;
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      gender: senator.gender,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
      seniority: +senator.seniority,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    };
  });
}


// const maleSenatorButton = document.createElement('button')
// maleSenatorButton.setAttribute("gender", "M")
// maleSenatorButton.textContent = 'Male Senators'
// maleSenatorButton.addEventListener('click', () => populateDOM(maleSenators))

// header.appendChild(allCongressButton)
// header.appendChild(maleSenators)



const simpleSenators = simplifiedSenators();

function populateSenatorDiv(simpleSenators) {
  simpleSenators.forEach((senator) => {
    const senFigure = document.createElement("figure");
    const figImg = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    figImg.src = senator.imgURL;
    figCaption.textContent = senator.name;

    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    senatorDiv.appendChild(senFigure);
  });
}

populateSenatorDiv(simpleSenators);

const mostSeniorMember = simplifiedSenators().reduce((acc, senator) => {
  return acc.seniority > senator.seniority ? acc : senator;
});

const biggestMissedVotedsPct = simplifiedSenators().reduce((acc, senator) =>
  acc.missedVotesPct > senator.missedVotesPct ? acc : senator
);

const biggestVacationerList = simplifiedSenators()
  .filter(
    (senator) =>
      senator.missedVotesPct === biggestMissedVotedsPct.missedVotesPct
  )
  .map((senator) => senator.name)
  .join(" and ");

seniorityHeading.textContent = `The most senior member of the senate is ${mostSeniorMember.name} 
and the biggest vacationers are ${biggestVacationerList}`;

simplifiedSenators().forEach((senator) => {
  if (senator.loyaltyPct === 100) {
    let listItem = document.createElement("li");
    listItem.textContent = senator.name;
    loyaltyList.appendChild(listItem);
  }
});

//To Do items to consider for your final project
//To Do some sort of UI for sorting by party affiliation or by party and gender with a count
//To Do Much better styling of the grid of sentors and their names
//To Do Maybe include more data with each congress memeber such as links to their Twitter or FB pages
//To Do Incorporate a way to select the members of the house of representatives
