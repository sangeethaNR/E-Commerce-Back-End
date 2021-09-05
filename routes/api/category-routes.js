const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [{ model: Product,
    
    }],
  }).then(rescategoryData=> res.json(rescategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product,
   }],
  }).then(rescategoryData => res.json(rescategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', async(req, res) => {
  // create a new category
  const categoryData = await Category.create({
    category_name: req.body.category_name,
  })
  .then(rescategoryData => res.json(rescategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
   .then(function(rowsUpdated) {
     res.json(rowsUpdated)
   })
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const tagData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
