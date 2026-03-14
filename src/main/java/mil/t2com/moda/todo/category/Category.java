package mil.t2com.moda.todo.category;

import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String label;

    public Category() {}

    public Category(String label) { this.label = label; }

    public Long getId() { return id; }

    public String getLabel() { return label; }

    public void setId(Long id) { this.id = id; }

    public void setLabel(String label) { this.label = label; }

    }
