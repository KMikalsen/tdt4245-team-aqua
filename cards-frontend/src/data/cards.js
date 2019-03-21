const scenarios = {
    's1':{
        id:"S1",
        title:"Picture sharing",
        description:"Someone shared a picture fo you that you are not comfortable with being shared."
    },
}

const cards = [
    {
        id:"C1",
        scenario:"1",
        title:"Admins",
        description:"Contact the administrator",
        feedback:"This is a good idea. If a user is unwilling to remove a picture of you that " +
            "they do not have permission to share, administrator have an obligation to help. Should it be your first move?"
    },
    {
        id:"C2",
        scenario:"1",
        title: "Comment",
        description:"Comment on the picture asking for it to be removed.",
        feedback:"Most people can be assumed not to be malicious, and will often comply if asked. What if they don't though?"
    },
    {
        id:"C3",
        scenario:"1",
        title: "Hitman",
        description:"Buy a hitman!",
        feedback:"In the current market, it may be difficult to acquire a hitman. They are quite expensive, you know?"
    },
    {
        id:"C4",
        scenario:"1",
        title: "Retribution",
        description:"Share a picture of them that is equally embarrassing to them.",
        feedback:"Do you really want to stoop to their level?"
    },
    {
        id:"C5",
        scenario:"1",
        title: "Contact",
        description:"Contact them privately and explain to them why it's not ok.",
        feedback:"Contacting someone privately may make them more likely to help. It's not fun to be called out publicly" +
            " for something you maybe didn't realise was wrong."
    },
    {
        id:"C6",
        scenario:"1",
        title: "Crowdsource",
        description:"Tell everyone you know so that they can help you get it removed.",
        feedback:"Receiving a torrent of request from many people to remove something will definitely have an effect, " +
            "but will you be responsible for what everyone you know says to this person in anger?"
    },
]

export {scenarios, cards};
