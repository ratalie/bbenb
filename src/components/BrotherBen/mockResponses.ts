import { Message } from "./ChatMessage";

// Mock responses for demonstration - will be replaced with real AI
const mockResponses: Record<string, Partial<Message>> = {
  comfort: {
    content: "I understand that difficult times can feel overwhelming, and I want you to know that you're not alone. The Lord promises to be with us in our trials.\n\nWhen we feel weary, we can find rest in His presence. Remember that our struggles are temporary, but His love for us is eternal. Take heart, dear friend.",
    scripture: {
      verse: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.",
      reference: "Matthew 11:28-29 (KJV)"
    },
    resources: [
      {
        title: "Finding Peace in Troubled Times",
        type: "podcast",
        url: "#"
      },
      {
        title: "The Comfort of God's Promises",
        type: "article",
        url: "#"
      }
    ]
  },
  baptism: {
    content: "Baptism holds a significant place in the Apostolic Christian faith. We believe in believer's baptism—that is, baptism follows a sincere confession of faith and repentance.\n\nUnlike infant baptism practiced in some traditions, we understand baptism as a conscious decision made by those who have experienced conversion and wish to publicly declare their faith in Christ.\n\nBaptism symbolizes the washing away of sins and the believer's union with Christ in His death and resurrection. It's a beautiful step of obedience and a testimony to the church.",
    scripture: {
      verse: "Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life.",
      reference: "Romans 6:4 (KJV)"
    },
    resources: [
      {
        title: "Understanding Apostolic Christian Baptism",
        type: "article",
        url: "#"
      },
      {
        title: "Light from the Word: Baptism",
        type: "article",
        url: "#"
      }
    ]
  },
  children: {
    content: "Raising children in the faith is such an important calling! The Around the Table podcast has several wonderful episodes on this topic.\n\nI'd encourage you to explore their discussions on family devotions, teaching children to pray, and navigating the challenges of raising kids in today's world while keeping faith central to family life.\n\nRemember, your example speaks volumes. Children learn so much by watching how we live out our faith daily.",
    scripture: {
      verse: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
      reference: "Proverbs 22:6 (KJV)"
    },
    resources: [
      {
        title: "Around the Table: Raising Faithful Children",
        type: "podcast",
        url: "#"
      },
      {
        title: "Around the Table: Family Devotions",
        type: "podcast",
        url: "#"
      },
      {
        title: "Parenting with Purpose (ETR)",
        type: "article",
        url: "#"
      }
    ]
  },
  salvation: {
    content: "The Apostolic Christian understanding of salvation is rooted deeply in Scripture. We believe that salvation is a gift of God's grace, received through faith in Jesus Christ.\n\nThis faith must be accompanied by genuine repentance—a turning away from sin and toward God. We believe that when a person truly repents and believes, they receive the assurance of salvation through the witness of the Holy Spirit.\n\nSalvation is not earned by works, but true faith will naturally produce a changed life and good works as its fruit.",
    scripture: {
      verse: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
      reference: "Ephesians 2:8-9 (KJV)"
    },
    resources: [
      {
        title: "Walking in the Teachings: Salvation",
        type: "article",
        url: "#"
      },
      {
        title: "General Conference: The Way of Salvation",
        type: "video",
        url: "#"
      }
    ]
  },
  default: {
    content: "Thank you for your question. Let me share some thoughts with you.\n\nAs we seek understanding in matters of faith, it's always good to ground ourselves in Scripture and the teachings that have guided the Apostolic Christian church through the years.\n\nI'd encourage you to explore some of our resources on AC Central, where you'll find articles, sermons, and podcast episodes that dive deeper into these topics. If you'd like, feel free to ask me something more specific, and I'll do my best to point you in the right direction.",
    scripture: {
      verse: "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      reference: "Proverbs 3:5-6 (KJV)"
    },
    resources: [
      {
        title: "Explore AC Central",
        type: "article",
        url: "#"
      }
    ]
  }
};

export function getMockResponse(userMessage: string): Partial<Message> {
  const lower = userMessage.toLowerCase();
  
  if (lower.includes("comfort") || lower.includes("difficult") || lower.includes("struggle") || lower.includes("hard time")) {
    return mockResponses.comfort;
  }
  if (lower.includes("baptism") || lower.includes("baptize")) {
    return mockResponses.baptism;
  }
  if (lower.includes("children") || lower.includes("raising") || lower.includes("parent") || lower.includes("family")) {
    return mockResponses.children;
  }
  if (lower.includes("salvation") || lower.includes("saved") || lower.includes("grace")) {
    return mockResponses.salvation;
  }
  
  return mockResponses.default;
}
