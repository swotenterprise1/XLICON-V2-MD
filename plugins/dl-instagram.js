import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `You need to give the URL of Any Instagram video, post, reel, image`;
  m.reply(wait);

  let res;
  try {
    res = await fetch(`https://bk9.fun/download/instagram?url=${text}`);
  } catch (error) {
    throw `An error occurred: ${error.message}`;
  }

  let api_response = await res.json();

  if (!api_response || !api_response.status) {
    throw `No video or image found or Invalid response from API.`;
  }

  const mediaArray = api_response.BK9;

  for (const mediaData of mediaArray) {
    const mediaType = mediaData.type;
    const mediaURL = mediaData.url;

    let cap = `HERE IS THE ${mediaType.toUpperCase()} >,<`;

    if (mediaType === 'mp4') {
      conn.sendFile(m.chat, mediaURL, 'instagram.mp4', cap, m);
    } else if (mediaType === 'jpg') {
      conn.sendFile(m.chat, mediaURL, 'instagram.jpg', cap, m);
    }
  }
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(instagram|igdl|ig|insta)$/i;

export default handler;
