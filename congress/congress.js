import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";

const allCongressMemebers = [...senators, ...representatives] // modern way to combine arrays

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



seniorityHeading.textContent = `The most senior member of the senate is ${mostSeniorMember.name} `;

simplifiedSenators().forEach((senator) => {
  if (senator.loyaltyPct === 100) {
    let listItem = document.createElement("li");
    listItem.textContent = senator.name;
    loyaltyList.appendChild(listItem);
  }
});

//To Do items to consider for your final project
//To Do somesort of UI for sorting by party affiliation or by party and gender with a count
//To Do Much better styling of the grid of sentors and their names
//To Do Maybe include more data with each congress memeber such as links to their Twitter or FB pages
//To Do Incorporate a way to select the members of the house of representatives

const biggestMissedVotedsPct = simplifiedSenators().reduce((acc, senator) =>
  acc.missedVotesPct > senator.missedVotesPct ? acc : senator
);

console.log(biggestMissedVotedsPct.missedVotesPct);

const biggestVacationerList = simplifiedSenators()
  .filter(
    (senator) =>
      senator.missedVotesPct === biggestMissedVotedsPct.missedVotesPct
  )
  .map((senator) => senator.name)
  .join();

  console.log(biggestVacationerList)