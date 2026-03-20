package mil.t2com.moda.todo.category;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Optional<Category> findCategoryByLabel(String label){
        return categoryRepository.findByLabel(label);
    }

    public Category resolveCategory(String categoryLabel){
        Optional<Category> category = this.findCategoryByLabel(categoryLabel);
        if (category.isPresent()){
            return category.get();
        }
        else{
            return this.saveCategory(new Category(categoryLabel));
        }
    }
    // ADD with Tests for: GetById, Put, Delete

}
