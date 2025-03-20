export const userData = {
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  role: "Staff",
};

export const allRequests = [
  {
    id: 1,
    status: "Pending",
    requestedTime: "March 10, 2025, 08:30 AM",
    acknowledgedTime: "March 10, 2025, 10:15 AM",
    completedTime: null,
    purpose: "For school research project",
    dateNeeded: "March 15, 2025",
    program: "Agricultural Studies",
    materials: [
      {
        name: "Fisheries Guide Book",
        quantity: 10,
        type: "Book",
        bannerPrograms: ["Livestock", "Poultry", "Agriculture"],
        image: "/broiler.jpg",
        views: 120,
        downloadCount: 45,
      },
    ],
  },
  {
    id: 2,
    status: "Completed",
    requestedTime: "March 8, 2025, 09:00 AM",
    acknowledgedTime: "March 8, 2025, 11:30 AM",
    completedTime: "March 9, 2025, 02:00 PM",
    purpose: "Community livelihood training",
    dateNeeded: "March 12, 2025",
    program: "Farmers’ Assistance Program",
    materials: [
      {
        name: "Corn Farming Manual",
        quantity: 7,
        type: "Manual",
        bannerPrograms: ["Corn"],
        image: "/ngulay.jpg",
        views: 200,
        downloadCount: 78,
      },
      {
        name: "Livestock Booklet",
        quantity: 12,
        type: "Booklet",
        bannerPrograms: ["Livestock", "Poultry", "Farm"],
        image: "/isda.jpg",
        views: 350,
        downloadCount: 120,
      },
      {
        name: "Rice Farming Handbook",
        quantity: 18,
        type: "Coffee Table Book",
        bannerPrograms: ["Rice"],
        image: "/vege.jpg",
        views: 280,
        downloadCount: 95,
      },
    ],
  },
];

export const allMaterials = [
  {
    id: 1,
    name: "Fisheries Guide Book",
    stock: 10,
    type: "Book",
    bannerPrograms: ["Livestock", "Poultry", "Agriculture"],
    image: "/broiler.jpg",
    views: 120,
    downloadCount: 45,
  },
  {
    id: 2,
    name: "Corn Farming Manual",
    stock: 7,
    type: "Manual",
    bannerPrograms: ["Corn"],
    image: "/ngulay.jpg",
    views: 200,
    downloadCount: 78,
  },
  {
    id: 3,
    name: "Livestock Booklet",
    stock: 12,
    type: "Booklet",
    bannerPrograms: ["Livestock", "Poultry", "Farm"],
    image: "/isda.jpg",
    views: 350,
    downloadCount: 120,
  },
  {
    id: 4,
    name: "Rice Farming Handbook",
    stock: 18,
    type: "Coffee Table Book",
    bannerPrograms: ["Rice"],
    image: "/organic.jpg",
    views: 280,
    downloadCount: 95,
  },
  {
    id: 5,
    name: "Rice Farming Handbook",
    stock: 18,
    type: "Coffee Table Book",
    bannerPrograms: ["Rice"],
    image: "vege.jpg",
    views: 280,
    downloadCount: 95,
  },
  {
    id: 6,
    name: "Rice Farming Handbook",
    stock: 18,
    type: "Coffee Table Book",
    bannerPrograms: ["Rice"],
    image: "/organic.jpg",
    views: 280,
    downloadCount: 95,
  },
  {
    id: 7,
    name: "Rice Farming Handbook Rice Farming Handbook Rice Farming Handbook",
    stock: 18,
    type: "Coffee Table Book",
    bannerPrograms: ["Rice"],
    image: "vege.jpg",
    views: 280,
    downloadCount: 95,
  },
];
