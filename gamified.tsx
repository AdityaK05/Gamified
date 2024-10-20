import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gamepad2, Trophy, Code, Zap, Variable, Repeat, Code2, Database, GitBranch, Layers, Clock, Coins, Star } from 'lucide-react'
import { getUserProfile, updateUserStats, getQuests, completeQuest } from '@/services/api'

const quests = [
  {
    id: 'variables',
    name: 'Variable Valley',
    description: 'Master the art of variables',
    icon: <Variable className="w-6 h-6" />,
    component: VariableQuest,
    color: 'from-yellow-700 to-yellow-1000',
    requiredLevel: 1,
  },
  {
    id: 'loops',
    name: 'Loop Lagoon',
    description: 'Navigate the waters of iteration',
    icon: <Repeat className="w-6 h-6" />,
    component: LoopQuest,
    color: 'from-blue-700 to-blue-1000',
    requiredLevel: 2,
  },
  {
    id: 'functions',
    name: 'Function Fortress',
    description: 'Build your function fortress',
    icon: <Code2 className="w-6 h-6" />,
    component: FunctionQuest,
    color: 'from-green-700 to-green-1000',
    requiredLevel: 3,
  },
  {
    id: 'arrays',
    name: 'Array Archipelago',
    description: 'Explore the islands of data structures',
    icon: <Database className="w-6 h-6" />,
    component: ArrayQuest,
    color: 'from-purple-700 to-purple-1000',
    requiredLevel: 4,
  },
  {
    id: 'objects',
    name: 'Object Oasis',
    description: 'Discover the power of objects',
    icon: <Layers className="w-6 h-6" />,
    component: ObjectQuest,
    color: 'from-red-700 to-red-1000',
    requiredLevel: 5,
  },
]

export default function CodeQuest() {
  const [currentQuest, setCurrentQuest] = useState(null)
  const [userStats, setUserStats] = useState({
    level: 1,
    exp: 0,
    coins: 0,
    character: '/placeholder.svg?height=64&width=64',
  })
  const [availableQuests, setAvailableQuests] = useState([])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile()
        setUserStats(profile)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    const fetchQuests = async () => {
      try {
        const fetchedQuests = await getQuests()
        setAvailableQuests(fetchedQuests)
      } catch (error) {
        console.error('Error fetching quests:', error)
      }
    }

    fetchUserProfile()
    fetchQuests()
  }, [])

  const handleUpdateUserStats = async (expGain, coinGain) => {
    try {
      const updatedUser = await updateUserStats(expGain, coinGain)
      setUserStats(updatedUser)
    } catch (error) {
      console.error('Error updating user stats:', error)
    }
  }

  const handleCompleteQuest = async (questId) => {
    try {
      const result = await completeQuest(questId)
      setUserStats(result.user)
      // You might want to update the available quests or show a success message here
    } catch (error) {
      console.error('Error completing quest:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-300">
      <header className="bg-gray-900 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold flex items-center text-yellow-700">
          <Gamepad2 className="mr-2" /> CodeQuest
        </h1>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center bg-gray-800 text-yellow-600">
            <Star className="mr-1 h-4 w-4" /> Level {userStats.level}
          </Badge>
          <Progress value={userStats.exp % 100} className="w-24 bg-gray-700" indicatorClassName="bg-yellow-700" />
          <Badge variant="secondary" className="flex items-center bg-gray-800 text-yellow-600">
            <Coins className="mr-1 h-4 w-4" /> {userStats.coins}
          </Badge>
          <Avatar>
            <AvatarImage src={userStats.character} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-yellow-600">Quest Map</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden bg-gray-900 border-2 ${userStats.level >= quest.requiredLevel ? 'border-yellow-700 cursor-pointer hover:shadow-xl hover:shadow-yellow-700/20 hover:scale-105 transition-all' : 'border-gray-800 opacity-50'}`}
                    onClick={() => userStats.level >= quest.requiredLevel && setCurrentQuest(quest)}>
                <div className={`h-2 bg-gradient-to-r ${quest.color}`} />
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-500">
                    {quest.icon}
                    <span className="ml-2">{quest.name}</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">{quest.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {userStats.level >= quest.requiredLevel ? (
                    <Badge variant="secondary" className="bg-gray-800 text-yellow-600">Available</Badge>
                  ) : (
                    <Badge variant="outline" className="border-gray-700 text-gray-500">Unlock at Level {quest.requiredLevel}</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {currentQuest && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="mt-8 bg-gray-900 border-2 border-yellow-700">
                <CardHeader>
                  <CardTitle className="text-blue-500">{currentQuest.name}</CardTitle>
                  <CardDescription className="text-gray-400">{currentQuest.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <currentQuest.component 
                    updateUserStats={handleUpdateUserStats} 
                    completeQuest={() => handleCompleteQuest(currentQuest.id)}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-gray-900 mt-12 py-6 text-center">
        <p className="text-gray-500">&copy; 2024 CodeQuest. All rights reserved.</p>
      </footer>
    </div>
  )
}

function VariableQuest({ updateUserStats, completeQuest }) {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const checkAnswer = () => {
    if (answer.toLowerCase() === 'let' || answer.toLowerCase() === 'const') {
      setFeedback('Correct! You\'ve mastered variable declaration!')
      updateUserStats(20, 10)
      completeQuest()
    } else {
      setFeedback('Not quite. Try again, adventurer!')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Declare a variable in modern JavaScript to store the name of your hero.</p>
      <div className="space-y-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your code"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button onClick={checkAnswer} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Submit Answer</Button>
      </div>
      {feedback && <p className="text-sm font-medium text-blue-500">{feedback}</p>}
    </div>
  )
}

function LoopQuest({ updateUserStats, completeQuest }) {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const checkAnswer = () => {
    if (answer.toLowerCase().includes('for') || answer.toLowerCase().includes('while')) {
      setFeedback('Excellent! You\'ve mastered the art of loops!')
      updateUserStats(30, 15)
      completeQuest()
    } else {
      setFeedback('Not quite there. Keep trying!')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Write a loop that counts from 1 to 10.</p>
      <div className="space-y-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your code"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button onClick={checkAnswer} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Submit Answer</Button>
      </div>
      {feedback && <p className="text-sm font-medium text-blue-500">{feedback}</p>}
    </div>
  )
}

function FunctionQuest({ updateUserStats, completeQuest }) {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const checkAnswer = () => {
    if (answer.toLowerCase().includes('function') || answer.toLowerCase().includes('=>')) {
      setFeedback('Great job! You\'ve constructed a solid function!')
      updateUserStats(40, 20)
      completeQuest()
    } else {
      setFeedback('Almost there! Try again.')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Define a function that adds two numbers.</p>
      <div className="space-y-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your code"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button onClick={checkAnswer} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Submit Answer</Button>
      </div>
      {feedback && <p className="text-sm font-medium text-blue-500">{feedback}</p>}
    </div>
  )
}

function ArrayQuest({ updateUserStats, completeQuest }) {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const checkAnswer = () => {
    if (answer.includes('[') && answer.includes(']')) {
      setFeedback('Fantastic! You\'ve mastered array creation!')
      updateUserStats(50, 25)
      completeQuest()
    } else {
      setFeedback('Not quite. Remember the syntax for arrays!')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Create an array containing the first three prime numbers.</p>
      <div className="space-y-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your code"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button onClick={checkAnswer} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Submit Answer</Button>
      </div>
      {feedback && <p className="text-sm font-medium text-blue-500">{feedback}</p>}
    </div>
  )
}

function ObjectQuest({ updateUserStats, completeQuest }) {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const checkAnswer = () => {
    if (answer.includes('{') &&   answer.includes('}') && answer.includes(':')) {
      setFeedback('Excellent work! You\'ve created a proper object!')
      updateUserStats(60, 30)
      completeQuest()
    } else {
      setFeedback('Close, but not quite. Remember the object syntax!')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Create an object representing a book with properties for title and author.</p>
      <div className="space-y-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your code"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button onClick={checkAnswer} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Submit Answer</Button>
      </div>
      {feedback && <p className="text-sm font-medium text-blue-500">{feedback}</p>}
    </div>
  )
}
