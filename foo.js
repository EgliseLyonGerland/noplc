const game = {
  teams: [
    { id: 1, name: "Riri", emoji: "💃" },
    { id: 2, name: "Fifi", emoji: "🦤" },
    { id: 3, name: "Loulou", emoji: "🍉" },
  ],
  results: [
    // {
    //   teamId: 1,
    //   categoryId: 1,
    //   success: true,
    // },
    {
      teamId: 2,
      categoryId: 2,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 3,
      success: true,
    },
    {
      teamId: 1,
      categoryId: 4,
      success: true,
    },
    {
      teamId: 2,
      categoryId: 5,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 6,
      success: true,
    },
    {
      teamId: 1,
      categoryId: 7,
      success: true,
    },
    {
      teamId: 2,
      categoryId: 8,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 9,
      success: true,
    },
    {
      teamId: 1,
      categoryId: 10,
      success: true,
    },
    {
      teamId: 2,
      categoryId: 11,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 12,
      success: true,
    },
    {
      teamId: 1,
      categoryId: 13,
      success: true,
    },
    {
      teamId: 2,
      categoryId: 14,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 15,
      success: true,
    },
    {
      teamId: 1,
      categoryId: 16,
      success: true,
    },
    {
      teamId: 2,
      categoryId: 17,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 18,
      success: true,
    },
    {
      teamId: 1,
      categoryId: 19,
      success: true,
    },
    {
      teamId: 2,
      categoryId: 20,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 21,
      success: true,
    },
    {
      teamId: 1,
      categoryId: 22,
      success: true,
    },
    {
      teamId: 2,
      categoryId: 23,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 24,
      success: true,
    },
    {
      teamId: 1,
      categoryId: 25,
      success: true,
    },
    {
      teamId: 2,
      categoryId: 26,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 27,
      success: true,
    },
    {
      teamId: 1,
      categoryId: 28,
      success: true,
    },
    {
      teamId: 2,
      categoryId: 29,
      success: true,
    },
    {
      teamId: 3,
      categoryId: 30,
      success: true,
    },
  ],
  started: true,
  ended: false,
  currentQuizId: null,
};

game.results = game.results.map((result) => ({
  ...result,
  success: Math.random() < 0.5,
}));

console.log(JSON.stringify(game));
