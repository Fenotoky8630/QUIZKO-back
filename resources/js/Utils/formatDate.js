export const formatDate = (dateString) => {
    const date = new Date(dateString); 
    const options = {
      weekday: "short", 
       year: "numeric", 
      month: "long", 
      day: "numeric",
      hour: "numeric", 
      minute: "numeric", 
      second: "numeric", 
      hour12: false,
    };
  
    return date.toLocaleDateString("fr-FR", options);
  };
  