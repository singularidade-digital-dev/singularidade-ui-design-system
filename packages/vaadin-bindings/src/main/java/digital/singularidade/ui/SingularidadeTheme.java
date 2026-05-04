package digital.singularidade.ui;

import com.vaadin.flow.component.dependency.JsModule;

/**
 * Marker class that imports the Singularidade Vaadin iconset (ss:* namespace)
 * and brand fonts so consumer apps don't have to register them manually.
 *
 * <p>Add {@link SingularidadeTheme} to any AppShellConfigurator (or import it
 * via {@code @JsModule}) to ensure the iconset and font CSS load on app boot.
 *
 * <pre>{@code
 * @Theme("singularidade")
 * @JsModule("@singularidade/brand-assets/build/vaadin-iconset.js")
 * public class Application implements AppShellConfigurator { }
 * }</pre>
 *
 * <p>Or extend this class for the same effect without writing the annotation
 * yourself.
 */
@JsModule("@singularidade/brand-assets/build/vaadin-iconset.js")
public final class SingularidadeTheme {
  /** Theme name registered for {@code @Theme("singularidade")}. */
  public static final String THEME_NAME = "singularidade";

  /** Light theme variant (default). */
  public static final String THEME_LIGHT = "light";

  /** Dark theme variant. */
  public static final String THEME_DARK = "dark";

  /** Brand: Singularidade Digital (matriz). */
  public static final String BRAND_SINGULARIDADE = "singularidade";

  /** Brand: integras.digital (sub-marca endossada). */
  public static final String BRAND_INTEGRAS = "integras";

  private SingularidadeTheme() {}
}
