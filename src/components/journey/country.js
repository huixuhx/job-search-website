export const countryInfos = [
    {
      index: 0,
      name: "china",
      latlng: [31.2304, 121.4737], // Shanghai
      desc: "I was born and raised in China 🇨🇳",
      useSVG:false,
    },
    {
      index: 1,
      name: "japan",
      latlng: [35.6895, 139.6917], // Tokyo
      desc: "I traveled to Tokyo after graduation—a vibrant city with unique charm 🏙️✨",
      useSVG:false,
    },
    {
      index: 2,
      name: "canada",
      latlng: [49.2827, -123.1207], // Vancouver
      desc: "Victoria, my current home, where I recently earned my Master's degree from the University of Victoria 🎓🇨🇦",
      useSVG:false,
    },
    {
      index: 3,
      name: "usa",
      latlng: [34.0522, -118.2437], // Los Angeles
      desc: "Los Angeles, where I earned my first Master's degree in Computer Science 🎓🌴",
      useSVG:false,
    },
  ];
  
  /**
   * Get country information by name
   * @param {string} name
   * @returns {Object | undefined} Country info object
   */
  export const getCountryInfoByName = (name) => {
    return countryInfos.find((country) => country.name.toLowerCase() === name.toLowerCase());
  };