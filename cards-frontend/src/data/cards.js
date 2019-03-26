const scenarios = {
    'S1':{
        id:"S1",
        title:"Picture sharing",
        description:"Someone shared a picture fo you that you are not comfortable with being shared.",
        cards:["C1", "C2", "C3", "C4", "C4", "C5", "C6"]
    },
    'S2':{
        id:"S2",
        title:"Friend request",
        description:"You received a friend request from someone you don't know.",
        cardIDs:["C7", "C8", "C9", "C10", "C11"]
    },
    's3':{
        id:"S3",
        title:"Contest",
        description:"A friend has sent you a link to a Facebook-contest where you could win some expensive item, the " +
            "contest wants you to give them access to your profile.",
        cardIDs: ["C12", "C13", "C14", "C15"]
    }

}

const cards = [
    {
        id:"C1",
        scenario:"1",
        title:"Admins",
        description:"Contact the administrator",
        feedback:"This is a good idea. If a user is unwilling to remove a picture of you that " +
            "they do not have permission to share, administrator have an obligation to help. Should it be your first move?",
        color:"yellow"
    },
    {
        id:"C2",
        scenario:"1",
        title: "Comment",
        description:"Comment on the picture asking for it to be removed.",
        feedback:"Most people can be assumed not to be malicious, and will often comply if asked. What if they don't though?",
        color:"green"
    },
    {
        id:"C3",
        scenario:"1",
        title: "Hitman",
        description:"Buy a hitman!",
        feedback:"In the current market, it may be difficult to acquire a hitman. They are quite expensive, you know?",
        color:"red"
    },
    {
        id:"C4",
        scenario:"1",
        title: "Retribution",
        description:"Share a picture of them that is equally embarrassing to them.",
        feedback:"Do you really want to stoop to their level?",
        color:"red"
    },
    {
        id:"C5",
        scenario:"1",
        title: "Contact",
        description:"Contact them privately and explain to them why it's not ok.",
        feedback:"Contacting someone privately may make them more likely to help. It's not fun to be called out publicly" +
            " for something you maybe didn't realise was wrong.",
        color:"green"
    },
    {
        id:"C6",
        scenario:"1",
        title: "Crowdsource",
        description:"Tell everyone you know so that they can help you get it removed.",
        feedback:"Receiving a torrent of request from many people to remove something will definitely have an effect, " +
            "but will you be responsible for what everyone you know says to this person in anger?",
        color:"yellow"
    },
    {
        id:"C7",
        scenario:"2",
        title:"Accept it",
        description:"The more the merrier.",
        feedback:"Maybe use a bit more scrutiny? They could be out to trick you.",
        color:"yellow"
    },
    {
        id:"C8",
        scenario:"2",
        title:"Ask them",
        description:"Ask them who they are. You may know the from somewhere but forgot.",
        feedback:"This is a good idea. It can rarely hurt to ask!",
        color:"green"
    },
    {
        id:"C9",
        scenario:"2",
        title:"Decline it",
        description:"Decline the friend request. Unsolicited friends requests are annoying.",
        feedback:"New phone, who dis? Maybe asking wouldn't have been a bad idea though?",
        color:"yellow"
    },
    {
        id:"C10",
        scenario:"2",
        title:"Investigate",
        description:"Search through their photos and proflie in an attempt to figure out who this is.",
        feedback:"This could definitely help you figure out who they are. Does it feel right?",
        color:"yellow"
    },
    {
        id:"C11",
        scenario:"2",
        title:"Leave it",
        description:"Leave them hanging, id you don't remember them, it's not worth responding.",
        feedback:"This is a bit rude. Certainly there are other ways to sort this out?",
        color:"yellow"
    },
    {
        id:"C12",
        scenario:"3",
        title:"Share it",
        description:"Share the contest to the rest of your friends list, after all referrals give you more chances to win",
        feedback:"Do you think all your friends appreciate this? You may want to reconsider this",
        color:"red"
    },
    {
        id:"C13",
        scenario:"3",
        title:"Give access",
        description:"Give the contest access to your profile, they say they need your name and e-mail so they can contact you ",
        feedback:"Are you sure that this isn't malicious content? Be sure of this before you participate.",
        color:"yellow"
    },
    {
        id:"C14",
        scenario:"3",
        title:"Talk to your friend",
        description:"Decline it and tell your friend to remove the app from his Facebook",
        feedback:"Maybe your friend doesn't know he sent it. Talk to them and let them know, and let them know you" +
            " don't want to receive more like this.",
        color:"green"
    },
    {
        id:"C15",
        scenario:"3",
        title:"Contact Facebook",
        description:"Contact the Facebook administrators to report the contest as a scam",
        feedback:"Are you confident this is malicious? No rules are broken yet. There are also way too many of these " +
            "for Facebook to handle each and every complaint.",
        color:"red"
    },
    {
        id:"C16",
        scenario:"3",
        title:"Ignore it",
        description:"Ignore it.",
        feedback:"You could just leave them hanging. They'll never know, right?",
        color:"green"
    },
]

export {scenarios, cards};
