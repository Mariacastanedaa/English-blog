/**
 * Configuration for Multimedia Evidence (Audios, Videos, and Transcripts)
 * 
 * Instructions:
 * - AUDIOS:
 *   You can place your .mp3 file in the '/public/audio/' folder (e.g. '/audio/my_speech.mp3')
 *   or use an external audio link (e.g. 'https://example.com/audio.mp3').
 *   If 'audioUrl' is empty (""), the website uses speech synthesis to read 'audioTranscript'.
 * 
 * - VIDEOS:
 *   You can paste a YouTube embed link (e.g. 'https://www.youtube.com/embed/VIDEO_ID'),
 *   a Google Drive / Vimeo embed link, or a direct .mp4 URL.
 *   If empty (""), it displays the presentation preview card.
 */

export interface MultimediaConfig {
  speakingAudio: {
    title: string;
    durationLabel: string;
    audioUrl: string; // e.g. '/audio/speaking_practice.mp3' or external URL
    transcript: string;
  };
  presentationVideo: {
    title: string;
    videoUrl: string; // e.g. 'https://www.youtube.com/embed/...' or direct .mp4
    durationLabel: string;
    description: string;
  };
}

export const MULTIMEDIA_CONFIG: MultimediaConfig = {
  speakingAudio: {
    title: 'Oral Evidence Audio #1 – SENA Presentation',
    durationLabel: '0:45 min · B1-B2 Speech',
    // Set your audio file path here (e.g., '/audio/my_recording.mp3' or a URL).
    // If left empty (""), it will read the transcript using clear English speech synthesis:
    audioUrl: '', 
    transcript:
      'Hello everyone and welcome to My English Journey! In this audio recording for SENA evidence GA7-240202501-AA1-EV03, I practice my pronunciation, intonation, and rhythm in intermediate B1 to B2 English. Practicing speaking aloud every day helps me build confidence and communicate ideas clearly.'
  },
  presentationVideo: {
    title: '“My English Journey” Presentation',
    // Set your YouTube embed URL (e.g. 'https://www.youtube.com/embed/YOUR_ID') or direct video URL here:
    videoUrl: '', 
    durationLabel: '2:15 min · English Subtitles',
    description:
      'In this oral video presentation, Mafe introduces her blog topics, explains her journey studying web development and digital marketing, and shares reflections on technology, travel, and society.'
  }
};
