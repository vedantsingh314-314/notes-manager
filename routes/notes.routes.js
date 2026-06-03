const express=require("express");
const fs=require("fs");
const router=express.Router();


router.get("/notes", (req, res) => {
    try {
        const data = fs.readFileSync("notes.json", "utf-8");
        const refinedData = JSON.parse(data);
        res.json(refinedData);
    } catch (error) {
        res.status(500).json({ error: "Failed to read notes" });
    }
});
router.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: "Title and content are required",
    });
  }

  try {
    const data = fs.readFileSync("notes.json", "utf-8");
    const notes = JSON.parse(data);
    const ispresent=notes.find(notes=>notes.title===title);
    if(ispresent){
        return res.status(400).json({
            error: "Note with this title already exists",
        });
    }
    const id = Date.now().toString();

    const newNote = {
      id,
      title,
      content,
    };

    notes.push(newNote);

    fs.writeFileSync(
      "notes.json",
      JSON.stringify(notes, null, 2)
    );

    return res.status(201).json({
      message: "Note added successfully",
      note: newNote,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});
router.put("/notes/:id", (req, res) => {
  try {
  const {id} = (req.params);
  const { title, content } = req.body;
  const data=fs.readFileSync("notes.json","utf-8");
  const notes=JSON.parse(data);
  const ispresent=notes.find(notes=>notes.id===id);
  if(!ispresent){
      return res.status(404).json({
          error: "Note not found",
      });
  }
  ispresent.title=title;
  ispresent.content=content;
  fs.writeFileSync("notes.json",JSON.stringify(notes,null,2));
  return res.status(200).json({
      message: "Note updated successfully",
      note: ispresent,
  });
} catch (error) {
  console.error(error);
  return res.status(500).json({
      error: "Something went wrong",
  });
}});
router.delete("/notes/:id", (req, res) => {
  try {
    const { id } = req.params; 
    const data=fs.readFileSync("notes.json", "utf-8");
    const notes=JSON.parse(data);
    const ispresent=notes.find(notes=>notes.id===id);
    if(!ispresent){
        return res.status(404).json({
            error: "the id is not present",
        });
    } 
    const filteredNotes=notes.filter(notes=>notes.id!==id);
    fs.writeFileSync("notes.json", JSON.stringify(filteredNotes, null, 2));
    return res.status(200).json({
        message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});
module.exports=router;