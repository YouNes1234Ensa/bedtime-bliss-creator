
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Sparkles, BookOpen, Star, Moon, Sun } from 'lucide-react';

interface StoryData {
  age: string;
  gender: string;
  interests: string[];
  style: string;
  lesson: string;
}

const StoryGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [storyData, setStoryData] = useState<StoryData>({
    age: '',
    gender: '',
    interests: [],
    style: '',
    lesson: ''
  });
  const [generatedStory, setGeneratedStory] = useState('');

  const steps = [
    { title: "What's your age?", key: 'age' },
    { title: "Are you a boy or girl?", key: 'gender' },
    { title: "What do you love?", key: 'interests' },
    { title: "What kind of story?", key: 'style' },
    { title: "What should we learn?", key: 'lesson' },
    { title: "Your magical story!", key: 'story' }
  ];

  const ageOptions = [
    { value: '3-5', label: '3-5 years old', icon: '🎈' },
    { value: '6-8', label: '6-8 years old', icon: '🌟' },
    { value: '9-12', label: '9-12 years old', icon: '🚀' }
  ];

  const genderOptions = [
    { value: 'boy', label: 'Boy', icon: '👦', gradient: 'from-blue-400 to-purple-500' },
    { value: 'girl', label: 'Girl', icon: '👧', gradient: 'from-pink-400 to-purple-500' }
  ];

  const interestOptions = [
    { value: 'animals', label: 'Animals', icon: '🦁', color: 'from-green-400 to-emerald-500' },
    { value: 'adventure', label: 'Adventure', icon: '🗺️', color: 'from-orange-400 to-red-500' },
    { value: 'magic', label: 'Magic', icon: '✨', color: 'from-purple-400 to-pink-500' },
    { value: 'science', label: 'Science', icon: '🔬', color: 'from-blue-400 to-indigo-500' },
    { value: 'sports', label: 'Sports', icon: '⚽', color: 'from-green-400 to-blue-500' },
    { value: 'art', label: 'Art', icon: '🎨', color: 'from-pink-400 to-orange-500' },
    { value: 'music', label: 'Music', icon: '🎵', color: 'from-purple-400 to-blue-500' },
    { value: 'nature', label: 'Nature', icon: '🌳', color: 'from-green-400 to-teal-500' },
    { value: 'space', label: 'Space', icon: '🌌', color: 'from-indigo-400 to-purple-500' },
    { value: 'dinosaurs', label: 'Dinosaurs', icon: '🦕', color: 'from-yellow-400 to-orange-500' }
  ];

  const styleOptions = [
    { value: 'funny', label: 'Funny', icon: '😄', description: 'Full of giggles and silly moments' },
    { value: 'heartwarming', label: 'Heartwarming', icon: '💖', description: 'Sweet and touching' },
    { value: 'adventurous', label: 'Adventurous', icon: '🌟', description: 'Exciting and thrilling' },
    { value: 'magical', label: 'Magical', icon: '✨', description: 'Enchanted and mysterious' },
    { value: 'educational', label: 'Educational', icon: '📚', description: 'Fun way to learn new things' }
  ];

  const lessonOptions = [
    { value: 'kindness', label: 'Kindness', icon: '💕', description: 'Being nice to others' },
    { value: 'courage', label: 'Courage', icon: '🦁', description: 'Being brave when scared' },
    { value: 'friendship', label: 'Friendship', icon: '🤝', description: 'Making and keeping friends' },
    { value: 'honesty', label: 'Honesty', icon: '✨', description: 'Always telling the truth' },
    { value: 'perseverance', label: 'Never Give Up', icon: '💪', description: 'Keep trying even when it\'s hard' },
    { value: 'sharing', label: 'Sharing', icon: '🎁', description: 'Sharing with others makes everyone happy' },
    { value: 'responsibility', label: 'Responsibility', icon: '⭐', description: 'Taking care of our duties' },
    { value: 'empathy', label: 'Understanding Others', icon: '🤗', description: 'Understanding how others feel' }
  ];

  const handleSelection = (key: string, value: string | string[]) => {
    const updatedData = { ...storyData, [key]: value };
    setStoryData(updatedData);
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        if (currentStep === steps.length - 2) {
          generateStory(updatedData);
        }
      }, 300);
    }
  };

  const handleInterestToggle = (interest: string) => {
    const updatedInterests = storyData.interests.includes(interest)
      ? storyData.interests.filter(i => i !== interest)
      : [...storyData.interests, interest];
    
    if (updatedInterests.length > 0) {
      setTimeout(() => {
        handleSelection('interests', updatedInterests);
      }, 300);
    } else {
      setStoryData({ ...storyData, interests: updatedInterests });
    }
  };

  const generateStory = (data: StoryData) => {
    // Enhanced story generation with much longer content
    const stories = {
      'funny-animals-kindness': `Once upon a time, in a colorful forest filled with the most peculiar creatures, there lived a young ${data.gender} named ${data.gender === 'boy' ? 'Max' : 'Luna'}. This wasn't just any ordinary forest - the trees wore polka-dot leaves, the flowers sang opera, and the rivers flowed with sparkling rainbow water!

${data.gender === 'boy' ? 'Max' : 'Luna'} loved exploring every corner of this magical place, but there was one problem: all the animals seemed to be having the silliest arguments you could imagine. The squirrels were arguing about whether acorns should be stored pointy-side up or down. The rabbits couldn't agree on the proper way to hop - should it be bounce-bounce-stop or bounce-stop-bounce? Even the wise old owls were hooting about whether "who" or "hoot" was the better greeting!

One sunny morning, ${data.gender === 'boy' ? 'Max' : 'Luna'} discovered that Benny the Bear had accidentally sat on his own birthday cake while trying to catch a butterfly. Poor Benny was covered in frosting from head to toe, looking like a walking dessert! All the other animals started laughing and pointing, which made Benny feel terrible.

But ${data.gender === 'boy' ? 'Max' : 'Luna'} had a different idea. Instead of laughing, they walked up to Benny and said, "You know what? You look like the most delicious birthday cake I've ever seen! But more importantly, are you okay?" This simple act of kindness made Benny smile through his tears.

${data.gender === 'boy' ? 'Max' : 'Luna'} then gathered all the animals and suggested they help clean up Benny and make him a new cake together. The squirrels brought the finest nuts (stored both ways, of course), the rabbits hopped quickly to gather berries (using both hopping styles), and the owls flew high to collect the sweetest honey from the tallest trees.

As they worked together, something magical happened. The animals realized that their silly arguments didn't matter nearly as much as helping a friend in need. They laughed together, shared stories, and discovered that being kind to each other was much more fun than being right about everything.

By the end of the day, not only did Benny have the most spectacular birthday cake the forest had ever seen, but all the animals had learned that kindness creates the most beautiful friendships. From that day forward, whenever someone in the forest needed help, they all remembered ${data.gender === 'boy' ? 'Max' : 'Luna'}'s example and chose kindness first.

And they all lived happily, kindly, and quite sillily ever after!`,

      'adventurous-magic-courage': `In a realm where shooting stars fell like gentle rain and mountains floated in the sky, there lived a brave young ${data.gender} named ${data.gender === 'boy' ? 'Alex' : 'Aria'}. This magical world was filled with wonders beyond imagination - crystal caves that sang lullabies, waterfalls that flowed upward into the clouds, and gardens where flowers bloomed into butterflies at midnight.

${data.gender === 'boy' ? 'Alex' : 'Aria'} had always dreamed of adventure, but there was one thing that made their heart race with fear: the Dark Valley that separated the Sunland from the Moonland. Legend said that no one had ever crossed it and returned to tell the tale.

One day, a urgent message arrived on the wings of a golden phoenix. The Moon Princess had lost her voice, and without it, the moon couldn't shine properly. The whole Moonland was growing dimmer each night, and soon, eternal darkness would fall. The only cure was the Singing Pearl, hidden deep within the heart of the Dark Valley.

${data.gender === 'boy' ? 'Alex' : 'Aria'} knew this was their chance to prove their courage, but as they stood at the edge of the Dark Valley, their knees began to shake. The valley was filled with swirling mists, strange sounds, and shadows that seemed to move on their own.

"I can't do this," ${data.gender === 'boy' ? 'Alex' : 'Aria'} whispered. "I'm too scared."

But then they remembered all the people counting on them - the Moon Princess, the children who loved to wish on moonbeams, and the night creatures who needed moonlight to find their way home. Sometimes being brave doesn't mean not being scared; it means doing what's right even when you are scared.

Taking a deep breath, ${data.gender === 'boy' ? 'Alex' : 'Aria'} stepped into the valley. At first, everything seemed terrifying - strange creatures with glowing eyes watched from the shadows, the ground beneath felt like walking on clouds, and whispers echoed from everywhere and nowhere.

But as ${data.gender === 'boy' ? 'Alex' : 'Aria'} continued forward, they discovered something amazing. The creatures weren't scary at all - they were the Guardian Spirits of the valley, and they had been waiting for someone brave enough to help them! The shadows were actually dancing, celebrating ${data.gender === 'boy' ? 'Alex' : 'Aria'}'s courage.

Deep in the heart of the valley, ${data.gender === 'boy' ? 'Alex' : 'Aria'} found the Singing Pearl, glowing with the most beautiful light. But to claim it, they had to answer one question: "What is true courage?"

${data.gender === 'boy' ? 'Alex' : 'Aria'} thought carefully and answered, "True courage isn't about not being afraid. It's about caring for others so much that you're willing to face your fears to help them."

The pearl glowed brighter and flew into ${data.gender === 'boy' ? 'Alex' : 'Aria'}'s hands. When they returned to the Moonland, the Moon Princess's voice returned, more beautiful than ever, and the moon shone with such brilliance that it could be seen from every corner of both lands.

From that day forward, ${data.gender === 'boy' ? 'Alex' : 'Aria'} was known as the Brave Heart, and they learned that the greatest adventures aren't about the places you go, but about the courage you find within yourself.`
    };

    // Generate a story based on the combination of style, interests, and lesson
    const storyKey = `${data.style}-${data.interests[0] || 'adventure'}-${data.lesson}`;
    
    // For demo purposes, we'll use a template and customize it
    let story = stories['funny-animals-kindness'];
    
    // Customize the story based on selections
    if (data.style === 'magical' || data.interests.includes('magic')) {
      story = stories['adventurous-magic-courage'];
    }
    
    // Add age-appropriate adjustments
    if (data.age === '3-5') {
      story = story.replace(/challenging/g, 'tricky').replace(/difficult/g, 'hard');
    }
    
    setGeneratedStory(story);
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.key) {
      case 'age':
        return (
          <div className="space-y-4">
            {ageOptions.map((option, index) => (
              <Card
                key={option.value}
                className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/50 animate-fade-in bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSelection('age', option.value)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{option.icon}</div>
                  <div className="text-xl font-semibold text-foreground">{option.label}</div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'gender':
        return (
          <div className="space-y-4">
            {genderOptions.map((option, index) => (
              <Card
                key={option.value}
                className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50 animate-fade-in bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSelection('gender', option.value)}
              >
                <div className={`flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br ${option.gradient} text-white`}>
                  <div className="text-6xl">{option.icon}</div>
                  <div className="text-2xl font-bold">{option.label}</div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'interests':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interestOptions.map((option, index) => (
              <Card
                key={option.value}
                className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 animate-fade-in bg-white/80 backdrop-blur-sm ${
                  storyData.interests.includes(option.value) 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleInterestToggle(option.value)}
              >
                <div className={`flex flex-col items-center space-y-2 p-4 rounded-xl bg-gradient-to-br ${option.color} text-white`}>
                  <div className="text-3xl">{option.icon}</div>
                  <div className="text-lg font-semibold">{option.label}</div>
                </div>
              </Card>
            ))}
            {storyData.interests.length > 0 && (
              <div className="col-span-full text-center mt-4">
                <p className="text-muted-foreground">Great choices! Moving to the next step...</p>
              </div>
            )}
          </div>
        );

      case 'style':
        return (
          <div className="space-y-4">
            {styleOptions.map((option, index) => (
              <Card
                key={option.value}
                className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/50 animate-fade-in bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSelection('style', option.value)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{option.icon}</div>
                  <div>
                    <div className="text-xl font-semibold text-foreground">{option.label}</div>
                    <div className="text-muted-foreground">{option.description}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'lesson':
        return (
          <div className="space-y-4">
            {lessonOptions.map((option, index) => (
              <Card
                key={option.value}
                className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/50 animate-fade-in bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSelection('lesson', option.value)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{option.icon}</div>
                  <div>
                    <div className="text-xl font-semibold text-foreground">{option.label}</div>
                    <div className="text-muted-foreground">{option.description}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'story':
        return (
          <div className="animate-fade-in">
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-primary/20">
              <div className="space-y-6">
                <div className="text-center">
                  <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
                  <h2 className="text-3xl font-bold text-primary mb-2">Your Magical Bedtime Story</h2>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <span>Age: {storyData.age}</span>
                    <span>•</span>
                    <span>Style: {storyData.style}</span>
                    <span>•</span>
                    <span>Lesson: {storyData.lesson}</span>
                  </div>
                </div>
                
                <div className="story-font text-lg leading-relaxed text-foreground space-y-4 max-h-96 overflow-y-auto">
                  {generatedStory.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="animate-slide-in" style={{ animationDelay: `${index * 200}ms` }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setCurrentStep(0);
                      setStoryData({
                        age: '', gender: '', interests: [], style: '', lesson: ''
                      });
                      setGeneratedStory('');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span>Create Another Story</span>
                  </button>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Moon className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Bedtime Story Creator
            </h1>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
          
          {currentStep < steps.length - 1 && (
            <>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                {steps[currentStep].title}
              </h2>
              
              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto bg-muted rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
              <p className="text-muted-foreground">
                Step {currentStep + 1} of {steps.length - 1}
              </p>
            </>
          )}
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default StoryGenerator;
