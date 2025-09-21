"use client"

import { useState } from "react"
import { Search, BookOpen, Star, Plus, Grid, List, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Sample manga data
const mangaData = [
  {
    id: 1,
    title: "One Piece",
    author: "Eiichiro Oda",
    genre: ["Aventure", "Comédie", "Shonen"],
    status: "En cours",
    volumes: 107,
    rating: 4.9,
    cover: "/one-piece-manga-cover.png",
    description: "L'histoire de Monkey D. Luffy, un jeune pirate qui rêve de devenir le Roi des Pirates.",
  },
  {
    id: 2,
    title: "Attack on Titan",
    author: "Hajime Isayama",
    genre: ["Action", "Drame", "Seinen"],
    status: "Terminé",
    volumes: 34,
    rating: 4.8,
    cover: "/attack-on-titan-manga-cover.png",
    description: "Dans un monde où l'humanité vit derrière des murs pour se protéger des Titans.",
  },
  {
    id: 3,
    title: "Demon Slayer",
    author: "Koyoharu Gotouge",
    genre: ["Action", "Surnaturel", "Shonen"],
    status: "Terminé",
    volumes: 23,
    rating: 4.7,
    cover: "/demon-slayer-manga-cover.png",
    description: "Tanjiro Kamado devient un chasseur de démons pour sauver sa sœur.",
  },
  {
    id: 4,
    title: "My Hero Academia",
    author: "Kohei Horikoshi",
    genre: ["Super-héros", "École", "Shonen"],
    status: "En cours",
    volumes: 39,
    rating: 4.6,
    cover: "/my-hero-academia-manga-cover.png",
    description: "Dans un monde où 80% de la population a des super-pouvoirs appelés Quirks.",
  },
  {
    id: 5,
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    genre: ["Action", "Surnaturel", "Shonen"],
    status: "En cours",
    volumes: 24,
    rating: 4.8,
    cover: "/jujutsu-kaisen-manga-cover.png",
    description: "Yuji Itadori rejoint une école secrète de sorciers pour combattre les fléaux.",
  },
  {
    id: 6,
    title: "Tokyo Ghoul",
    author: "Sui Ishida",
    genre: ["Horreur", "Surnaturel", "Seinen"],
    status: "Terminé",
    volumes: 14,
    rating: 4.5,
    cover: "/tokyo-ghoul-manga-cover.jpg",
    description: "Ken Kaneki devient un demi-goule après une rencontre fatale.",
  },
]

// Sample reviews data
const reviewsData = [
  {
    id: 1,
    mangaId: 1,
    mangaTitle: "One Piece",
    author: "Akira T.",
    rating: 5,
    comment: "Une aventure épique qui ne cesse de surprendre ! L'univers est riche et les personnages attachants.",
    date: "2024-01-15",
    helpful: 12,
  },
  {
    id: 2,
    mangaId: 2,
    mangaTitle: "Attack on Titan",
    author: "Marie L.",
    rating: 4,
    comment:
      "Une histoire sombre et captivante avec des rebondissements incroyables. La fin est controversée mais cohérente.",
    date: "2024-01-10",
    helpful: 8,
  },
  {
    id: 3,
    mangaId: 3,
    mangaTitle: "Demon Slayer",
    author: "Yuki S.",
    rating: 5,
    comment:
      "Les dessins sont magnifiques et l'histoire est touchante. Un manga qui mélange action et émotion parfaitement.",
    date: "2024-01-08",
    helpful: 15,
  },
]

export default function MangaLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<number[]>([])

  const [reviews, setReviews] = useState(reviewsData)
  const [newReview, setNewReview] = useState({ mangaId: "", rating: "", comment: "" })
  const [questionnaire, setQuestionnaire] = useState({
    favoriteGenre: "",
    readingFrequency: "",
    recommendation: "",
  })

  const filteredManga = mangaData.filter((manga) => {
    const matchesSearch =
      manga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manga.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "all" || manga.genre.includes(selectedGenre)
    const matchesStatus = selectedStatus === "all" || manga.status === selectedStatus

    return matchesSearch && matchesGenre && matchesStatus
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const submitReview = () => {
    if (newReview.mangaId && newReview.rating && newReview.comment) {
      const manga = mangaData.find((m) => m.id === Number.parseInt(newReview.mangaId))
      const review = {
        id: reviews.length + 1,
        mangaId: Number.parseInt(newReview.mangaId),
        mangaTitle: manga?.title || "",
        author: "Lecteur Anonyme",
        rating: Number.parseInt(newReview.rating),
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
        helpful: 0,
      }
      setReviews([review, ...reviews])
      setNewReview({ mangaId: "", rating: "", comment: "" })
    }
  }

  const submitQuestionnaire = () => {
    console.log("Questionnaire soumis:", questionnaire)
    // Here you would typically send to a backend
    alert("Merci pour vos réponses ! Elles nous aident à améliorer notre service.")
    setQuestionnaire({ favoriteGenre: "", readingFrequency: "", recommendation: "" })
  }

  const allGenres = Array.from(new Set(mangaData.flatMap((manga) => manga.genre)))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-card-foreground">MangaLib</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reviews">Avis Lecteurs</TabsTrigger>
            <TabsTrigger value="questionnaire">Questionnaire</TabsTrigger>
            <TabsTrigger value="catalog">Catalogue</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Add Review Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Partager votre avis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      value={newReview.mangaId}
                      onValueChange={(value) => setNewReview({ ...newReview, mangaId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un manga" />
                      </SelectTrigger>
                      <SelectContent>
                        {mangaData.map((manga) => (
                          <SelectItem key={manga.id} value={manga.id.toString()}>
                            {manga.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={newReview.rating}
                      onValueChange={(value) => setNewReview({ ...newReview, rating: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Note (1-5 étoiles)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 étoiles - Excellent</SelectItem>
                        <SelectItem value="4">4 étoiles - Très bon</SelectItem>
                        <SelectItem value="3">3 étoiles - Bon</SelectItem>
                        <SelectItem value="2">2 étoiles - Moyen</SelectItem>
                        <SelectItem value="1">1 étoile - Décevant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Textarea
                    placeholder="Partagez votre opinion sur ce manga..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="min-h-[100px]"
                  />

                  <Button onClick={submitReview} className="w-full md:w-auto">
                    Publier l'avis
                  </Button>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Derniers avis ({reviews.length})</h3>
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{review.mangaTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            Par {review.author} • {review.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3 text-pretty">{review.comment}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Utile ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          Signaler
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="questionnaire" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Questionnaire Lecteur</CardTitle>
                <p className="text-muted-foreground">
                  Aidez-nous à mieux comprendre vos préférences de lecture (3 questions rapides)
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium">1. Quel est votre genre de manga préféré ?</Label>
                  <RadioGroup
                    value={questionnaire.favoriteGenre}
                    onValueChange={(value) => setQuestionnaire({ ...questionnaire, favoriteGenre: value })}
                  >
                    {allGenres.map((genre) => (
                      <div key={genre} className="flex items-center space-x-2">
                        <RadioGroupItem value={genre} id={genre} />
                        <Label htmlFor={genre}>{genre}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">2. À quelle fréquence lisez-vous des mangas ?</Label>
                  <RadioGroup
                    value={questionnaire.readingFrequency}
                    onValueChange={(value) => setQuestionnaire({ ...questionnaire, readingFrequency: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Tous les jours</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">Plusieurs fois par semaine</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Quelques fois par mois</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rarely" id="rarely" />
                      <Label htmlFor="rarely">Rarement</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="recommendation" className="text-base font-medium">
                    3. Recommanderiez-vous notre librairie à un ami ?
                  </Label>
                  <RadioGroup
                    value={questionnaire.recommendation}
                    onValueChange={(value) => setQuestionnaire({ ...questionnaire, recommendation: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="definitely" id="definitely" />
                      <Label htmlFor="definitely">Certainement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="probably" id="probably" />
                      <Label htmlFor="probably">Probablement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="maybe" />
                      <Label htmlFor="maybe">Peut-être</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unlikely" id="unlikely" />
                      <Label htmlFor="unlikely">Peu probable</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={submitQuestionnaire}
                  className="w-full"
                  disabled={
                    !questionnaire.favoriteGenre || !questionnaire.readingFrequency || !questionnaire.recommendation
                  }
                >
                  Soumettre le questionnaire
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalog" className="mt-6">
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un manga ou un auteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les genres</SelectItem>
                    {allGenres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="En cours">En cours</SelectItem>
                    <SelectItem value="Terminé">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Manga Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredManga.map((manga) => (
                <Card key={manga.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={manga.cover || "/placeholder.svg"}
                          alt={manga.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                          onClick={() => toggleFavorite(manga.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              favorites.includes(manga.id) ? "fill-accent text-accent" : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-balance">{manga.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{manga.author}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {manga.genre.slice(0, 2).map((genre) => (
                              <Badge key={genre} variant="secondary" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                            {manga.genre.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{manga.genre.length - 2}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{manga.volumes} vol.</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              <span className="font-medium">{manga.rating}</span>
                            </div>
                          </div>
                          <Badge variant={manga.status === "En cours" ? "default" : "outline"} className="w-fit">
                            {manga.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <div className="flex space-x-4 p-4">
                      <img
                        src={manga.cover || "/placeholder.svg"}
                        alt={manga.title}
                        className="w-20 h-28 object-cover rounded"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{manga.title}</h3>
                            <p className="text-muted-foreground">{manga.author}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => toggleFavorite(manga.id)}>
                            <Star
                              className={`h-4 w-4 ${
                                favorites.includes(manga.id) ? "fill-accent text-accent" : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground text-pretty">{manga.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {manga.genre.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="secondary" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>{manga.volumes} vol.</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              <span>{manga.rating}</span>
                            </div>
                            <Badge variant={manga.status === "En cours" ? "default" : "outline"}>{manga.status}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {filteredManga.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun manga trouvé</h3>
                <p className="text-muted-foreground">Essayez de modifier vos critères de recherche.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Mangas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{mangaData.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avis Publiés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{reviews.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">En cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">
                    {mangaData.filter((m) => m.status === "En cours").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Favoris</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{favorites.length}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Genres populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allGenres.map((genre) => {
                    const count = mangaData.filter((manga) => manga.genre.includes(genre)).length
                    return (
                      <Badge key={genre} variant="outline" className="text-sm">
                        {genre} ({count})
                      </Badge>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
